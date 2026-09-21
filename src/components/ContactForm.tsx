import { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock, ArrowRight, Sparkles, MessageCircle, Youtube, Instagram } from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactFormProps {
  prefilledService?: string;
}

export function ContactForm({ prefilledService }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: prefilledService || 'Produção Audiovisual & Cobertura de Eventos',
    budget: 'Quero uma proposta personalizada para meu orçamento',
    website: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [protocol, setProtocol] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const servicesList = [
    'Produção Audiovisual & Cobertura de Eventos',
    'Vídeo Comercial / Mídia Indoor para Loja',
    'Identidade Visual & Motion Design',
    'Divulgação Digital & Gestão de Redes',
    'Filme de Casamento ou Celebração',
  ];

  const budgetList = [
    'Quero uma proposta personalizada para meu orçamento',
    'Projeto pontual (Produção de vídeo / Evento)',
    'Vídeo comercial ou Mídia Indoor para loja',
    'Produção para Igreja ou Projeto Social',
    'Comércio local ou Profissional autônomo',
    'Planejamento mensal contínuo',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.phone.trim()) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios marcados com *.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Por favor, forneça um e-mail válido.');
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      const generatedProtocol = `ANR-${Math.floor(100000 + Math.random() * 900000)}`;
      setProtocol(generatedProtocol);
      setStatus('success');
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: 'Produção Audiovisual & Cobertura de Eventos',
      budget: 'Quero uma proposta personalizada para meu orçamento',
      website: '',
      message: '',
    });
    setStatus('idle');
    setProtocol('');
  };

  const getWhatsappUrl = (name?: string) => {
    const cleanName = name?.trim();
    const text = cleanName
      ? `Olá! Meu nome é ${cleanName}. Gostaria de *solicitar* um orçamento para *minha empresa.*`
      : `Olá! Gostaria de *solicitar* um orçamento para *minha empresa.*`;
    return `https://api.whatsapp.com/send?phone=5599999331639&text=${encodeURIComponent(text)}`;
  };

  const getSuccessWhatsappUrl = () => {
    const cleanName = formData.name?.trim() || '';
    const namePart = cleanName ? `Meu nome é ${cleanName}. ` : '';
    const text = `Olá! ${namePart}Gostaria de *solicitar* um orçamento para *minha empresa.* (Serviço: ${formData.service} | Protocolo: ${protocol || 'ANR-NOVO'})`;
    return `https://api.whatsapp.com/send?phone=5599999331639&text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contato" className="py-20 md:py-28 relative bg-zinc-950 border-t border-zinc-900">
      {/* Background ambience */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Sincere Presentation */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-400 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Orçamento Sem Compromisso</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Vamos Conversar Sobre o Seu Projeto?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
                Preencha o formulário ao lado com suas necessidades. Montamos uma proposta transparente, focada na qualidade técnica do serviço e no valor que cabe com segurança no seu orçamento.
              </p>
            </div>

            {/* Response time badge */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Atendimento Rápido e Direto</h4>
                <p className="text-xs text-zinc-400">
                  Retornamos com brevidade para alinhar os detalhes e prazos do seu projeto.
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-zinc-300">
                  <strong className="block text-white">Atendimento Presencial & Remoto</strong>
                  Produção e filmagem no Maranhão e projetos digitais para todo o Brasil
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs sm:text-sm text-zinc-300">
                  <a href="mailto:contato@aneresstudio.com.br" className="hover:text-amber-400 transition-colors">
                    contato@aneresstudio.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs sm:text-sm text-zinc-300">
                  <a
                    href={getWhatsappUrl(formData.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 font-semibold text-white transition-colors"
                  >
                    (99) 99933-1639
                  </a>
                  <span className="block text-zinc-400 text-xs">WhatsApp Comercial & Atendimento</span>
                </div>
              </div>
            </div>

            {/* Quick Social & Contact Channels */}
            <div className="space-y-4">
              {/* WhatsApp Box */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/40 to-zinc-900 border border-emerald-500/30">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Prefere conversar diretamente pelo WhatsApp?
                </h4>
                <p className="mt-1 text-xs text-zinc-300">
                  Fale diretamente pelo WhatsApp (99) 99933-1639 para solicitar seu orçamento.
                </p>
                <a
                  href={getWhatsappUrl(formData.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp-direct-btn"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
                >
                  <span>Chamar no WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Instagram Box */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-pink-950/30 to-zinc-900 border border-pink-500/30">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-400" />
                  Siga no Instagram
                </h4>
                <p className="mt-1 text-xs text-zinc-300">
                  Acompanhe os bastidores das gravações, novidades e lançamentos do estúdio.
                </p>
                <a
                  href="https://www.instagram.com/aneresstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
                >
                  <span>Seguir @aneresstudio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* YouTube Channel Link */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-red-950/40 to-zinc-900 border border-red-500/30">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-500 fill-current" />
                  Canal Oficial no YouTube
                </h4>
                <p className="mt-1 text-xs text-zinc-300">
                  Confira nossas produções audiovisuais completas em 4K e conheça o estilo ANERES Studio.
                </p>
                <a
                  href="https://www.youtube.com/@ANERESSTUDIO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
                >
                  <span>Acessar @ANERESSTUDIO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success View */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-2xl relative">
              
              {status === 'success' ? (
                /* Success Screen */
                <div className="text-center py-8 space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                      Protocolo: {protocol}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-3">
                      Mensagem Recebida com Sucesso!
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300 max-w-md mx-auto">
                      Obrigado, <strong className="text-white">{formData.name}</strong>! Recebemos suas informações e entraremos em contato com uma proposta realista e sob medida para seu projeto.
                    </p>
                  </div>

                  {/* WhatsApp Quick Action */}
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 max-w-md mx-auto text-left">
                    <span className="text-xs text-zinc-400 block mb-2">Quer agilizar pelo WhatsApp?</span>
                    <a
                      href={getSuccessWhatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirmar no WhatsApp (99) 99933-1639</span>
                    </a>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-zinc-400 hover:text-white underline transition-colors"
                    >
                      Enviar outra mensagem ou alterar dados
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                      Solicitar Orçamento Personalizado
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Conte-nos sobre o seu projeto ou necessidade para montarmos uma proposta justa.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-lg bg-red-950/50 border border-red-500/50 text-xs text-red-200">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: Carlos Silva"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/90 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Seu E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seuemail@exemplo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/90 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  {/* Company and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Empresa, Projeto ou Evento *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Ex: Minha Loja / Casamento / Evento"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/90 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(99) 99999-9999"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/90 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  {/* Service selector chips */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">
                      Serviço Principal de Interesse *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {servicesList.map((serv) => (
                        <button
                          key={serv}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, service: serv }))}
                          className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                            formData.service === serv
                              ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-semibold'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          {serv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget selector and Website link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budget" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Modalidade / Orçamento Pretendido
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/90 text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        {budgetList.map((b) => (
                          <option key={b} value={b} className="bg-zinc-950 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Instagram ou Link de Referência (opcional)
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="@seunegocio ou link"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/90 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Conte um pouco sobre sua ideia ou objetivo
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ex: Precisamos de um vídeo para divulgar nossa loja nas redes ou fazer a cobertura do nosso evento..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/90 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  {/* Submit Button & Direct WhatsApp CTA */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-bold transition-all shadow-lg shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Pedido de Orçamento</span>
                        </>
                      )}
                    </button>

                    <div className="relative flex items-center justify-center py-1">
                      <div className="border-t border-zinc-800 w-full" />
                      <span className="bg-zinc-900/90 px-3 text-[11px] text-zinc-500 uppercase tracking-wider absolute">
                        ou fale diretamente
                      </span>
                    </div>

                    <a
                      href={getWhatsappUrl(formData.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="contact-form-whatsapp-btn"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/40 hover:border-emerald-500/70 text-emerald-400 hover:text-emerald-300 text-sm font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Chamar no WhatsApp (Solicitar Orçamento)</span>
                    </a>

                    <p className="text-[11px] text-zinc-400 text-center mt-2.5">
                      Atendimento direto no (99) 99933-1639. Seus dados são tratados com total sigilo.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
