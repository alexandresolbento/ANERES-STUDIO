import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'serv-audiovisual',
    title: 'Produção Audiovisual & Cobertura de Eventos',
    subtitle: 'Vídeos Profissionais em 4K, Documentários e Comerciais para Redes e Telas',
    icon: 'Video',
    tag: 'Destaque Studio',
    description: 'Roteirização, captação com câmeras profissionais e drones, iluminação adequada, edição com ritmo, tratamento de áudio e color grading. Produzimos desde vídeos institucionais até coberturas de eventos e celebrações.',
    features: [
      'Gravação em 4K com câmeras profissionais e captação aérea',
      'Formatos adaptados (16:9 para YouTube/TV e 9:16 vertical para Reels/TikTok/Status)',
      'Edição cuidadosa, trilha sonora adequada e tratamento de cores',
      'Cobertura dedicada de eventos esportivos, culturais, religiosos e sociais',
      'Entrega pontual em alta definição pronta para veicular'
    ]
  },
  {
    id: 'serv-performance',
    title: 'Divulgação Digital & Gestão de Redes',
    subtitle: 'Presença Online Consciente e Anúncios Locais sem Desperdício de Verba',
    icon: 'TrendingUp',
    tag: 'Presença Digital',
    description: 'Planejamento de conteúdo e impulsionamento direcionado para alcançar clientes reais na sua cidade ou região. Campanhas pensadas com responsabilidade para o orçamento do seu negócio.',
    features: [
      'Anúncios segmentados para o público e região do seu interesse',
      'Conexão direta dos anúncios com o WhatsApp da sua empresa',
      'Você define o valor diário que quer investir sem surpresas',
      'Relatórios simples e objetivos, sem termos técnicos desnecessários',
      'Acompanhamento próximo para fazer cada investimento valer a pena'
    ]
  },
  {
    id: 'serv-branding',
    title: 'Identidade Visual & Motion Design',
    subtitle: 'Logotipos, Vinhetas e Materiais que Valorizam a Imagem do Seu Negócio',
    icon: 'Sparkles',
    tag: 'Design & Marca',
    description: 'Criação de marcas autênticas, vinhetas animadas em motion design e peças gráficas que transmitem profissionalismo e confiança para o seu público.',
    features: [
      'Criação e redesenho de logotipo para empresas, profissionais e projetos',
      'Vinhetas animadas (Motion Graphics) para aberturas de vídeos e redes',
      'Artes personalizadas para feed, stories e banners de eventos',
      'Arquivos finais organizados e prontos para impressão ou uso digital'
    ]
  },
  {
    id: 'serv-cro',
    title: 'Mídia Indoor & Telas Promocionais',
    subtitle: 'Vídeos Rápidos e Dinâmicos para Painéis, Vitrines e Pontos de Venda',
    icon: 'Layers',
    tag: 'Mídia no PDV',
    description: 'Comerciais curtos de 15 a 30 segundos com visual dinâmico, pensados para reter a atenção do público em totens, televisores e telões de estabelecimentos comerciais.',
    features: [
      'Animações objetivas destacando produtos, ofertas e horários',
      'Adaptação sob medida para qualquer resolução ou formato de painel',
      'Leitura clara e atrativa mesmo em ambientes com áudio ambiente',
      'Pacotes acessíveis para atualizações periódicas de promoções'
    ]
  }
];

export const CLIENT_LOGOS = [
  { name: 'Segrob Controle de Pragas', category: 'Controle de Pragas & Saúde Ambiental' },
  { name: 'Mearim Motos', category: 'Concessionária & Motocicletas' },
  { name: 'Dr. Vinicius Santos Advocacia', category: 'Advocacia & Assessoria Jurídica' },
  { name: 'Financeira Santos Empréstimos', category: 'Crédito & Soluções Financeiras' },
  { name: 'Plena Publicidade', category: 'Comunicação Visual & Publicidade' },
  { name: 'RV Reboques e Metalúrgica', category: 'Reboques & Estruturas Metálicas' },
  { name: 'Metalúrgica Januário', category: 'Indústria Metalúrgica & Serralheria' },
  { name: 'Chilli Beans', category: 'Mídia Indoor & Varejo' },
  { name: 'Elevare', category: 'Identidade & Motion Design' },
  { name: 'Arena CSF', category: 'Mídia Indoor & Esportes' },
  { name: 'Clube de Desbravadores', category: 'Documentários & Eventos' },
  { name: 'Ingrid & Vanilson', category: 'Filme de Casamento' },
  { name: 'Desbrava Race', category: 'Aventura & Esportes' },
  { name: 'IASD Pedreiras', category: 'Cobertura de Eventos' },
];
