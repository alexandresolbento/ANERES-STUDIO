import { useState, useEffect } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock, ArrowRight, Sparkles, MessageCircle, ShieldCheck, Zap } from 'lucide-react';
import { ContactFormData } from '../types';
import { saveQuoteToDatabase, getAccessToken, updateQuoteStatusInDatabase } from '../firebase';
import { sendQuoteEmailViaGmail, ADMIN_EMAIL } from '../services/gmail';
import { AneresLogo } from './AneresLogo';
import { AneresWatermark } from './AneresWatermark';

interface ContactFormProps {
  prefilledService?: string;
}

export function ContactForm({ prefilledService }: ContactFormProps) {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'site'>('whatsapp');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    service: prefilledService || 'Vídeo Comercial ou Institucional',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  const serviceOptions = [
    { id: 'comercial', label: '📹 Vídeo Comercial ou Institucional' },
    { id: 'evento', label: '🎉 Cobertura de Evento ou Celebração' },
    { id: 'reels', label: '📱 Vídeos para Redes Sociais & Reels' },
    { id: 'identidade', label: '🎨 Identidade Visual & Motion Design' },
    { id: 'outro', label: '💡 Outro / Quero uma consultoria' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildWhatsappLink = () => {
    const nome = formData.name.trim() || 'Cliente';
    const servico = formData.service;
    const detalhes = formData.message?.trim() ? ` Detalhes: ${formData.message.trim()}` : '';
    const texto = `Olá! Meu nome é *${nome}* e gostaria de solicitar um orçamento para *${servico}*.${detalhes}`;
    return `https://api.whatsapp.com/send?phone=5599999331639&text=${encodeURIComponent(texto)}`;
  };

  const handleSendWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Por favor, informe seu nome.');
      return;
    }

    try {
      // Background persistent storage
      const record = await saveQuoteToDatabase({
        name: formData.name,
        phone: formData.phone || '(Via WhatsApp Direto)',
        service: formData.service,
        email: formData.email,
        message: formData.message,
        source: 'whatsapp_redirect',
      });

      // Background email notification
      const token = getAccessToken();
      if (token) {
        sendQuoteEmailViaGmail(record, token).then((res) => {
          if (res.success) {
            updateQuoteStatusInDatabase(record.id, { emailSent: true, emailSentAt: new Date().toISOString() });
          }
        }).catch((err) => console.warn('Notification log:', err));
      }
    } catch (err) {
      console.warn('Silent save log:', err);
    }

    // Open WhatsApp safely in iframe environments
    const link = buildWhatsappLink();
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSendSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Por favor, preencha seu nome e telefone/WhatsApp.');
      return;
    }

    setStatus('submitting');

    try {
      // 1. Silent database persistence
      const record = await saveQuoteToDatabase({
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        email: formData.email,
        message: formData.message,
        source: 'site_form',
      });

      // 2. Silent email notification
      const token = getAccessToken();
      if (token) {
        sendQuoteEmailViaGmail(record, token, {
          customRecipient: ADMIN_EMAIL,
          includeClientCc: Boolean(formData.email),
        }).then((gmailRes) => {
          if (gmailRes.success) {
            updateQuoteStatusInDatabase(record.id, {
              emailSent: true,
              emailSentAt: new Date().toISOString(),
            });
          }
        }).catch((err) => console.warn('Notification dispatch:', err));
      }

      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Ocorreu um erro temporário. Por favor tente enviar pelo WhatsApp.');
      setStatus('idle');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      service: 'Vídeo Comercial ou Institucional',
      email: '',
      message: '',
    });
    setStatus('idle');
  };

  return (
    <section id="contato" className="py-16 md:py-24 relative bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle brand watermark */}
      <AneresWatermark
        position="bottom-left"
        size="xl"
        opacity="opacity-[0.025] sm:opacity-[0.035]"
        rotation="-rotate-6"
        glow={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-semibold text-amber-400 mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Orçamento Rápido & Sem Compromisso</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Solicite Seu Orçamento em Menos de 1 Minuto
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-300">
            Diga o que você precisa produzir e receba uma proposta clara, rápida e pensada para o seu bolso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct WhatsApp & Trust */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct WhatsApp High-Conversion Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-zinc-900 to-zinc-900 border border-emerald-500/30 shadow-xl relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Atendimento Online no WhatsApp
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Falar Direto com a Produção
              </h3>
              <p className="text-xs text-zinc-300 mb-5 leading-relaxed">
                Tire dúvidas na hora, receba exemplos de vídeos e solicite valores personalizados sem burocracia.
              </p>

              <a
                href={buildWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-direct-whatsapp-btn"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 group-hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chamar no WhatsApp Agora</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <span className="block text-center text-[11px] text-zinc-400 mt-2.5">
                Número direto: <strong>(99) 99933-1639</strong>
              </span>
            </div>

            {/* Brand Proof & Assurances */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Retorno Rápido</h4>
                  <p className="text-[11px] text-zinc-400">Respondemos em até 2 horas úteis.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sem Compromisso</h4>
                  <p className="text-[11px] text-zinc-400">Analise a proposta com total liberdade.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Qualidade Garantida em 4K</h4>
                  <p className="text-[11px] text-zinc-400">Equipamentos de cinema e entrega pontual.</p>
                </div>
              </div>
            </div>

            {/* Location & Email info */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-400 space-y-2">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Maranhão (Gravações presenciais) & Todo Brasil</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contato@aneresstudio.com.br</span>
              </div>
            </div>

          </div>

          {/* Right Column: Ultra-Simple Fast Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-2xl relative">
              
              {/* Tab Selector: Fast WhatsApp vs Form */}
              <div className="flex items-center p-1 rounded-xl bg-zinc-950 border border-zinc-800 mb-6">
                <button
                  type="button"
                  id="tab-select-whatsapp"
                  onClick={() => setActiveTab('whatsapp')}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'whatsapp'
                      ? 'bg-emerald-500 text-zinc-950 shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Via WhatsApp (Mais Rápido)</span>
                </button>
                <button
                  type="button"
                  id="tab-select-site"
                  onClick={() => setActiveTab('site')}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'site'
                      ? 'bg-amber-400 text-zinc-950 shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Pelo Site</span>
                </button>
              </div>

              {status === 'success' ? (
                /* Clean Visitor Success Screen */
                <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      Pedido Enviado com Sucesso!
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300 max-w-sm mx-auto">
                      Obrigado, <strong className="text-white">{formData.name}</strong>! Recebemos sua solicitação e entraremos em contato em até 2 horas úteis pelo WhatsApp.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={buildWhatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Abrir Conversa no WhatsApp Agora</span>
                    </a>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Enviar outro orçamento
                    </button>
                  </div>
                </div>
              ) : (
                /* Simplified Form */
                <form onSubmit={activeTab === 'whatsapp' ? handleSendWhatsapp : handleSendSite} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                      {errorMessage}
                    </div>
                  )}

                  {/* 1. Nome */}
                  <div>
                    <label htmlFor="quote-name" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      1. Seu Nome ou da sua Empresa *
                    </label>
                    <input
                      type="text"
                      id="quote-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Alexandre Bento"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* 2. WhatsApp / Telefone */}
                  <div>
                    <label htmlFor="quote-phone" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      2. Seu WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      id="quote-phone"
                      name="phone"
                      required={activeTab === 'site'}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(99) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* 3. Serviço Desejado */}
                  <div>
                    <label htmlFor="quote-service" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      3. Qual serviço você gostaria de orçar? *
                    </label>
                    <select
                      id="quote-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt.id} value={opt.label} className="bg-zinc-950 text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. Email (Opcional) */}
                  <div>
                    <label htmlFor="quote-email" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      4. Seu E-mail <span className="text-zinc-500 font-normal">(Opcional)</span>
                    </label>
                    <input
                      type="email"
                      id="quote-email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      placeholder="seu.email@exemplo.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* 5. Breve Mensagem (Opcional) */}
                  <div>
                    <label htmlFor="quote-message" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      5. Algum detalhe ou prazo? <span className="text-zinc-500 font-normal">(Opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="quote-message"
                      name="message"
                      value={formData.message || ''}
                      onChange={handleChange}
                      placeholder="Ex: Gravação no sábado / Projeto para YouTube e Reels"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    {activeTab === 'whatsapp' ? (
                      <button
                        type="submit"
                        id="submit-whatsapp-quote-btn"
                        className="w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.01] cursor-pointer"
                      >
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span>Receber Orçamento no WhatsApp Agora</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        id="submit-site-quote-btn"
                        disabled={status === 'submitting'}
                        className="w-full py-4 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.01] cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{status === 'submitting' ? 'Enviando Pedido...' : 'Enviar Pedido de Orçamento'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-center text-[11px] text-zinc-500 pt-1">
                    🔒 Sem compromisso e resposta rápida. Atendimento humano direto com a equipe.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
