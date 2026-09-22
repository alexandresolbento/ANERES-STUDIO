import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { QuoteRecord } from './types';

// 1. Initialize Firebase App safely
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Initialize Firestore with specified firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

// 3. Initialize Auth
export const auth = getAuth(app);

// 4. Configure Google Auth Provider with Gmail Scopes
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/gmail.send');
googleProvider.addScope('https://mail.google.com/');
googleProvider.addScope('https://www.googleapis.com/auth/gmail.modify');
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Cached in-memory access token per workspace-integration skill
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// 5. Auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// 6. Sign in with Google Popup
export const signInWithGoogle = async (): Promise<{ user: User; accessToken: string | null } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || null;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Sign in with Google error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// 7. Error handling per firebase-skill guidelines
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 8. Database Operations for Quote Requests
const QUOTES_COLLECTION = 'quote_requests';
const LOCAL_STORAGE_KEY = 'aneres_registered_quotes';

// Fallback to localStorage for resilient offline support
export const getLocalQuotes = (): QuoteRecord[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Could not read from local storage:', e);
    return [];
  }
};

export const saveLocalQuote = (quote: QuoteRecord) => {
  try {
    const existing = getLocalQuotes();
    const updated = [quote, ...existing.filter((q) => q.id !== quote.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not save to local storage:', e);
  }
};

// Save a quote request to Firestore + localStorage
export const saveQuoteToDatabase = async (
  data: Omit<QuoteRecord, 'id' | 'createdAt' | 'status'> & { id?: string }
): Promise<QuoteRecord> => {
  const id = data.id || `quote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const nowIso = new Date().toISOString();

  const record: QuoteRecord = {
    id,
    name: data.name.trim(),
    phone: data.phone.trim(),
    service: data.service.trim(),
    email: data.email?.trim() || '',
    company: data.company?.trim() || '',
    message: data.message?.trim() || '',
    status: 'pending',
    source: data.source || 'site_form',
    createdAt: nowIso,
    emailSent: false,
  };

  // Always save locally first for zero-data-loss
  saveLocalQuote(record);

  // Attempt Firestore write
  try {
    const quoteDocRef = doc(db, QUOTES_COLLECTION, id);
    await setDoc(quoteDocRef, {
      ...record,
      timestamp: serverTimestamp(),
    });
    console.log(`[Firestore] Quote ${id} successfully recorded in Firestore database.`);
  } catch (err) {
    console.warn('[Firestore] Could not write to remote Firestore, kept in local database queue:', err);
    // Do not throw to end user: we guaranteed offline resilience
  }

  return record;
};

// Fetch quotes from Firestore with local fallback
export const fetchQuotesFromDatabase = async (): Promise<QuoteRecord[]> => {
  try {
    const q = query(collection(db, QUOTES_COLLECTION), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const quotes: QuoteRecord[] = [];

    snapshot.forEach((docSnap) => {
      const d = docSnap.data();
      quotes.push({
        id: docSnap.id,
        name: d.name || '',
        phone: d.phone || '',
        service: d.service || '',
        email: d.email || '',
        company: d.company || '',
        message: d.message || '',
        status: d.status || 'pending',
        source: d.source || 'site_form',
        createdAt: d.createdAt || new Date().toISOString(),
        emailSent: !!d.emailSent,
        emailSentAt: d.emailSentAt || '',
      });
    });

    if (quotes.length > 0) {
      // Merge with local quotes
      const local = getLocalQuotes();
      const map = new Map<string, QuoteRecord>();
      local.forEach((q) => map.set(q.id, q));
      quotes.forEach((q) => map.set(q.id, q));
      return Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return getLocalQuotes();
  } catch (err) {
    console.warn('[Firestore] Failed to fetch from remote Firestore, reading local quotes:', err);
    return getLocalQuotes();
  }
};

// Update quote status or emailSent flag
export const updateQuoteStatusInDatabase = async (
  id: string,
  updates: Partial<Pick<QuoteRecord, 'status' | 'emailSent' | 'emailSentAt'>>
) => {
  // Update local
  const local = getLocalQuotes();
  const updatedLocal = local.map((q) => (q.id === id ? { ...q, ...updates } : q));
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLocal));

  // Update Firestore
  try {
    const quoteDocRef = doc(db, QUOTES_COLLECTION, id);
    await updateDoc(quoteDocRef, updates);
  } catch (err) {
    console.warn('[Firestore] Update failed:', err);
  }
};
