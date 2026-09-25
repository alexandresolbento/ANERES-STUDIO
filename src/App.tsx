import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoShowcase } from './components/VideoShowcase';
import { Services } from './components/Services';
import { ConversionBanner } from './components/ConversionBanner';
import { ContactForm } from './components/ContactForm';
import { CinemaModal } from './components/CinemaModal';
import { AdminQuotesModal } from './components/AdminQuotesModal';
import { Footer } from './components/Footer';
import { AIErrorBoundary } from './components/AIErrorBoundary';
import { VideoWork } from './types';
import { initAuth, setCachedAccessToken } from './firebase';

export default function App() {
  // Auth state for Google / Gmail integration
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        if (token) {
          setAccessToken(token);
          setCachedAccessToken(token);
        }
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );

    // Check URL parameters for admin access (e.g., ?admin=true or #admin)
    const checkAdminQuery = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || window.location.hash === '#admin') {
        setIsAdminModalOpen(true);
      }
    };
    checkAdminQuery();
    window.addEventListener('hashchange', checkAdminQuery);

    // Discrete keyboard shortcut for administrator: Ctrl+Shift+A or Alt+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') ||
        (e.altKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', checkAdminQuery);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleAuthChange = (user: User | null, token: string | null) => {
    setCurrentUser(user);
    setAccessToken(token);
    setCachedAccessToken(token);
  };

  // Cinema modal state
  const [cinemaVideo, setCinemaVideo] = useState<{
    isOpen: boolean;
    videoId: string | null;
    title: string;
    client?: string;
    description?: string;
  }>({
    isOpen: false,
    videoId: null,
    title: '',
    client: '',
    description: '',
  });

  // Contact form prefilled state
  const [prefilledService, setPrefilledService] = useState<string>(
    'Produção Audiovisual & Cobertura de Eventos'
  );

  // Handlers
  const handleOpenVideoReel = () => {
    setCinemaVideo({
      isOpen: true,
      videoId: '1WTBm8pQGig', // ANERES Studio Featured Production
      title: 'DESBRAVADORES | Uma Experiência que Transforma Vidas',
      client: 'ANERES Studio Produções',
      description:
        'Produção cinematográfica oficial da ANERES Studio retratando companheirismo, superação e a energia transformadora da juventude em 4K.',
    });
  };

  const handleSelectVideoForCinema = (video: VideoWork) => {
    setCinemaVideo({
      isOpen: true,
      videoId: video.youtubeId,
      title: video.title,
      client: video.client,
      description: video.description,
    });
  };

  const handleSelectServiceToQuote = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      const navOffset = 76;
      const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-zinc-950 relative overflow-x-hidden w-full max-w-full transition-colors duration-200">
      {/* Navigation */}
      <Navbar onOpenVideoReel={handleOpenVideoReel} />

      {/* Main Content Sections with AI Self-Healing Boundary */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        {/* Hero Section */}
        <AIErrorBoundary fallbackName="Apresentação & Hero">
          <Hero onOpenVideoReel={handleOpenVideoReel} />
        </AIErrorBoundary>

        {/* Portfólio de Vídeos Oficiais (YouTube) */}
        <AIErrorBoundary fallbackName="Portfólio em Vídeo">
          <VideoShowcase onSelectVideoForCinema={handleSelectVideoForCinema} />
        </AIErrorBoundary>

        {/* Serviços & Especialidades */}
        <AIErrorBoundary fallbackName="Serviços & Especialidades">
          <Services onSelectServiceToQuote={handleSelectServiceToQuote} />
        </AIErrorBoundary>

        {/* Banner de Alta Conversão para Atração de Clientes */}
        <AIErrorBoundary fallbackName="Chamada de Conversão">
          <ConversionBanner />
        </AIErrorBoundary>

        {/* Formulário de Orçamento & Contato */}
        <AIErrorBoundary fallbackName="Formulário de Orçamentos">
          <ContactForm prefilledService={prefilledService} />
        </AIErrorBoundary>
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />

      {/* YouTube Cinema Player Modal */}
      <CinemaModal
        isOpen={cinemaVideo.isOpen}
        videoId={cinemaVideo.videoId}
        title={cinemaVideo.title}
        client={cinemaVideo.client}
        description={cinemaVideo.description}
        onClose={() =>
          setCinemaVideo((prev) => ({ ...prev, isOpen: false }))
        }
      />

      {/* Base de Dados de Orçamentos & Central Gmail Modal */}
      <AdminQuotesModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        currentUser={currentUser}
        accessToken={accessToken}
        onAuthChange={handleAuthChange}
      />
    </div>
  );
}

