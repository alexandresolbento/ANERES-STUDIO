import { useState, useEffect } from 'react';
import {
  X,
  Mail,
  CheckCircle2,
  Clock,
  Send,
  ExternalLink,
  RefreshCw,
  LogOut,
  Database,
  Filter,
  AlertTriangle,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { QuoteRecord } from '../types';
import {
  fetchQuotesFromDatabase,
  updateQuoteStatusInDatabase,
  signInWithGoogle,
  logoutGoogle,
  auth,
} from '../firebase';
import { sendQuoteEmailViaGmail, ADMIN_EMAIL } from '../services/gmail';
import { GoogleSignInButton } from './GoogleSignInButton';
import { formatWhatsAppUserUrl, getWhatsAppUrl } from '../utils/whatsapp';

interface AdminQuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  accessToken: string | null;
  onAuthChange: (user: User | null, token: string | null) => void;
}

export function AdminQuotesModal({
  isOpen,
  onClose,
  currentUser,
  accessToken,
  onAuthChange,
}: AdminQuotesModalProps) {
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_contact' | 'completed'>('all');
  const [selectedQuoteForEmail, setSelectedQuoteForEmail] = useState<QuoteRecord | null>(null);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);
  const [emailSuccessMsg, setEmailSuccessMsg] = useState<string | null>(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string | null>(null);

  // Load quotes on open
  useEffect(() => {
    if (isOpen) {
      loadQuotes();
    }
  }, [isOpen]);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const data = await fetchQuotesFromDatabase();
      setQuotes(data);
    } catch (err) {
      console.error('Failed to load quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res) {
        onAuthChange(res.user, res.accessToken);
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    onAuthChange(null, null);
  };

  const handleStatusChange = async (
    quoteId: string,
    newStatus: 'pending' | 'in_contact' | 'completed' | 'cancelled'
  ) => {
    await updateQuoteStatusInDatabase(quoteId, { status: newStatus });
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
    );
  };

  // User confirmation dialog before executing destructive/mutating operation (sending email via Gmail API)
  const confirmAndSendGmail = async () => {
    if (!selectedQuoteForEmail) return;
    const quote = selectedQuoteForEmail;

    if (!accessToken) {
      setEmailErrorMsg('Por favor, conecte-se com sua conta Google com permissões do Gmail primeiro.');
      return;
    }

    setSendingEmailId(quote.id);
    setEmailSuccessMsg(null);
    setEmailErrorMsg(null);

    try {
      const result = await sendQuoteEmailViaGmail(quote, accessToken, {
        customRecipient: ADMIN_EMAIL,
        includeClientCc: true,
      });

      if (result.success) {
        setEmailSuccessMsg(
          `Email enviado com sucesso via Gmail para ${ADMIN_EMAIL}! (ID: ${result.messageId?.substring(0, 10)}...)`
        );
        const nowIso = new Date().toISOString();
        await updateQuoteStatusInDatabase(quote.id, {
          emailSent: true,
          emailSentAt: nowIso,
        });
        setQuotes((prev) =>
          prev.map((q) =>
            q.id === quote.id ? { ...q, emailSent: true, emailSentAt: nowIso } : q
          )
        );
      } else {
        setEmailErrorMsg(result.error || 'Erro desconhecido ao enviar email via Gmail.');
      }
    } catch (err) {
      setEmailErrorMsg(err instanceof Error ? err.message : 'Falha na comunicação com a API do Gmail');
    } finally {
      setSendingEmailId(null);
      setSelectedQuoteForEmail(null);
    }
  };

  if (!isOpen) return null;

  const filteredQuotes = quotes.filter((q) => {
    if (statusFilter === 'all') return true;
    return q.status === statusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-zinc-100 shadow-2xl my-8 transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                Central de Orçamentos & Gmail
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30">
                <Database className="w-3 h-3" /> Firestore Ativo
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Base de Dados de Orçamentos
            </h2>
            <p className="text-sm text-slate-700 dark:text-zinc-300">
              Todas as respostas preenchidas no site registradas em tempo real e integradas ao Gmail.
            </p>
          </div>

          {/* Auth Status & Google Sign In */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-xs overflow-hidden">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    currentUser.email?.substring(0, 2).toUpperCase() || 'AN'
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200 truncate max-w-[140px]">
                    {currentUser.displayName || currentUser.email}
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Gmail Conectado
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Desconectar"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <GoogleSignInButton
                onClick={handleGoogleLogin}
                isLoading={authLoading}
                label="Conectar Gmail"
                className="py-2.5 px-4 text-xs"
              />
            )}
          </div>
        </div>

        {/* Global Notifications */}
        {emailSuccessMsg && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <span className="font-medium">{emailSuccessMsg}</span>
          </div>
        )}

        {emailErrorMsg && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500 dark:text-rose-400" />
            <span className="font-medium">{emailErrorMsg}</span>
          </div>
        )}

        {/* Filters & Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Filtrar:</span>
            <div className="flex gap-1.5 bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs">
              {(['all', 'pending', 'in_contact', 'completed'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    statusFilter === filter
                      ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {filter === 'all' && `Todos (${quotes.length})`}
                  {filter === 'pending' &&
                    `Pendentes (${quotes.filter((q) => q.status === 'pending').length})`}
                  {filter === 'in_contact' &&
                    `Em Contato (${quotes.filter((q) => q.status === 'in_contact').length})`}
                  {filter === 'completed' &&
                    `Concluídos (${quotes.filter((q) => q.status === 'completed').length})`}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={loadQuotes}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Atualizar Lista
          </button>
        </div>

        {/* Quotes List */}
        <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
          {loading && quotes.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-zinc-500 text-sm">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-500 dark:text-amber-400" />
              Carregando registros da base de dados...
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-zinc-500 text-sm border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
              Nenhum orçamento encontrado nesta categoria.
            </div>
          ) : (
            filteredQuotes.map((quote) => {
              const whatsappUrl =
                formatWhatsAppUserUrl(
                  quote.phone,
                  `Olá ${quote.name}! Aqui é da ANERES Studio a respeito do seu orçamento de ${quote.service}.`
                ) || getWhatsAppUrl();

              return (
                <div
                  key={quote.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700/80 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-base text-slate-900 dark:text-white">{quote.name}</span>
                        {quote.company && (
                          <span className="text-xs text-slate-700 bg-slate-200 dark:text-zinc-300 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-medium">
                            {quote.company}
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            quote.status === 'pending'
                              ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30'
                              : quote.status === 'in_contact'
                              ? 'bg-blue-500/15 text-blue-800 dark:text-blue-300 border-blue-500/30'
                              : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
                          }`}
                        >
                          {quote.status === 'pending' && 'Pendente'}
                          {quote.status === 'in_contact' && 'Em Contato'}
                          {quote.status === 'completed' && 'Concluído'}
                          {quote.status === 'cancelled' && 'Cancelado'}
                        </span>

                        {quote.emailSent ? (
                          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Email Enviado
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-600 dark:text-zinc-400 bg-slate-200 dark:bg-zinc-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" /> Email Pendente
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-zinc-300">
                        <span>
                          <strong className="text-slate-900 dark:text-white">WhatsApp:</strong> {quote.phone}
                        </span>
                        {quote.email && (
                          <span>
                            <strong className="text-slate-900 dark:text-white">Email:</strong> {quote.email}
                          </span>
                        )}
                        <span className="text-amber-800 dark:text-amber-400 font-bold">
                          <strong>Serviço:</strong> {quote.service}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Send Email via Gmail Button */}
                      <button
                        onClick={() => setSelectedQuoteForEmail(quote)}
                        disabled={sendingEmailId === quote.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {quote.emailSent ? 'Reenviar Gmail' : 'Enviar por Gmail'}
                      </button>

                      {/* WhatsApp Button */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {quote.message && (
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800/60 text-xs text-slate-800 dark:text-zinc-200 italic mb-3">
                      "{quote.message}"
                    </div>
                  )}

                  {/* Footer of Card */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-zinc-800/50 text-[11px] text-slate-600 dark:text-zinc-400 font-medium">
                    <div>
                      ID: <span className="font-mono text-slate-700 dark:text-zinc-300">{quote.id}</span> • Registrado em:{' '}
                      {new Date(quote.createdAt).toLocaleString('pt-BR')}
                    </div>

                    <div className="flex items-center gap-2">
                      <span>Alterar Status:</span>
                      <select
                        value={quote.status}
                        onChange={(e) =>
                          handleStatusChange(quote.id, e.target.value as QuoteRecord['status'])
                        }
                        className="bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 rounded-lg px-2 py-0.5 text-xs focus:outline-none focus:border-amber-500"
                      >
                        <option value="pending">Pendente</option>
                        <option value="in_contact">Em Contato</option>
                        <option value="completed">Concluído</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Confirmation Modal for Mutating Action (Send Email via Gmail API) */}
        {selectedQuoteForEmail && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-900 dark:text-zinc-100">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                <Send className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Confirmar Disparo de Email via Gmail
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-300 mb-4 leading-relaxed">
                Você está prestes a enviar uma notificação formal de orçamento com os dados de{' '}
                <strong className="text-amber-600 dark:text-amber-400">{selectedQuoteForEmail.name}</strong> para{' '}
                <strong className="text-slate-900 dark:text-white">{ADMIN_EMAIL}</strong>
                {selectedQuoteForEmail.email && (
                  <>
                    {' '}
                    e com cópia para o solicitante (
                    <strong className="text-slate-900 dark:text-white">{selectedQuoteForEmail.email}</strong>)
                  </>
                )}
                .
              </p>

              <div className="p-3.5 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-slate-200 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-400 space-y-1 mb-5">
                <div>
                  <strong>Serviço:</strong> {selectedQuoteForEmail.service}
                </div>
                <div>
                  <strong>Contato:</strong> {selectedQuoteForEmail.phone}
                </div>
                <div>
                  <strong>Remetente:</strong> Conta autenticada do Google / Gmail ({auth.currentUser?.email || 'Gmail'})
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedQuoteForEmail(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmAndSendGmail}
                  disabled={sendingEmailId === selectedQuoteForEmail.id}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {sendingEmailId === selectedQuoteForEmail.id ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Enviando via Gmail...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Confirmar e Enviar Agora
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
