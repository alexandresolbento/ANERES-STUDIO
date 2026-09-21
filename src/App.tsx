import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoShowcase } from './components/VideoShowcase';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { CinemaModal } from './components/CinemaModal';
import { Footer } from './components/Footer';
import { AIErrorBoundary } from './components/AIErrorBoundary';
import { VideoWork } from './types';

export default function App() {
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-zinc-950 relative">
      {/* Navigation */}
      <Navbar onOpenVideoReel={handleOpenVideoReel} />

      {/* Main Content Sections with AI Self-Healing Boundary */}
      <main className="flex-grow">
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

        {/* Formulário de Orçamento & Contato */}
        <AIErrorBoundary fallbackName="Formulário de Orçamentos">
          <ContactForm prefilledService={prefilledService} />
        </AIErrorBoundary>
      </main>

      {/* Footer */}
      <Footer />

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
    </div>
  );
}

