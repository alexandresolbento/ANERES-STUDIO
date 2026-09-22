import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoShowcase } from './components/VideoShowcase';
import { Services } from './components/Services';
import { ConversionBanner } from './components/ConversionBanner';
import { ContactForm } from './components/ContactForm';
import { CinemaModal } from './components/CinemaModal';
import { FloatingQuoteCTA } from './components/FloatingQuoteCTA';
import { AdminQuotesModal } from './components/AdminQuotesModal';
import { Footer } from './components/Footer';
import { AnimatedSection } from './components/AnimatedSection';
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
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-zinc-950 relative overflow-x-hidden w-full max-w-full">
      {/* Navigation */}
      <Navbar onOpenVideoReel={handleOpenVideoReel} />

      {/* Main Content Sections with AI Self-Healing Boundary & Smooth Scroll Transitions */}
      <main className="flex-grow w-full overflow-x-hidden">
        {/* Hero Section */}
        <AnimatedSection>
          <AIErrorBoundary fallbackName="Apresentação & Hero">
            <Hero onOpenVideoReel={handleOpenVideoReel} />
          </AIErrorBoundary>
        </AnimatedSection>

        {/* Portfólio de Vídeos Oficiais (YouTube) */}
        <AnimatedSection>
          <AIErrorBoundary fallbackName="Portfólio em Vídeo">
            <VideoShowcase onSelectVideoForCinema={handleSelectVideoForCinema} />
          </AIErrorBoundary>
        </AnimatedSection>

        {/* Serviços & Especialidades */}
        <AnimatedSection>
          <AIErrorBoundary fallbackName="Serviços & Especialidades">
            <Services onSelectServiceToQuote={handleSelectServiceToQuote} />
          </AIErrorBoundary>
        </AnimatedSection>

        {/* Banner de Alta Conversão para Atração de Clientes */}
        <AnimatedSection>
          <AIErrorBoundary fallbackName="Chamada de Conversão">
            <ConversionBanner />
          </AIErrorBoundary>
        </AnimatedSection>

        {/* Formulário de Orçamento & Contato */}
        <AnimatedSection>
          <AIErrorBoundary fallbackName="Formulário de Orçamentos">
            <ContactForm prefilledService={prefilledService} />
          </AIErrorBoundary>
        </AnimatedSection>
      </main>

      {/* Floating Persistent WhatsApp / Quote CTA */}
      <FloatingQuoteCTA />

      {/* Footer */}
      <AnimatedSection threshold={0.05}>
        <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />
      </AnimatedSection>

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

