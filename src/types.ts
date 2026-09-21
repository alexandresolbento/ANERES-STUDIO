export interface VideoWork {
  id: string;
  title: string;
  client: string;
  category: 'Comercial & TV' | 'Brand Film' | 'Documentário & Eventos' | 'Social & Reels' | 'Identidade & Motion';
  youtubeId: string;
  youtubeUrl: string;
  duration: string;
  views: string;
  thumbnail: string;
  description: string;
  directorNote?: string;
  deliverables: string[];
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  website?: string;
  message: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  features: string[];
  tag: string;
}
