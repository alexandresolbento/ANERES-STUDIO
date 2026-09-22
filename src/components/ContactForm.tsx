import { useState, useEffect } from 'react';
import { CheckCircle2, Phone, Mail, MapPin, Clock, ArrowRight, Sparkles, MessageCircle, ShieldCheck, Zap, Instagram, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { ContactFormData } from '../types';
import { saveQuoteToDatabase, getAccessToken, updateQuoteStatusInDatabase } from '../firebase';
import { sendQuoteEmailViaGmail } from '../services/gmail';
import { AneresLogo } from './AneresLogo';
import { AneresWatermark } from './AneresWatermark';

interface ContactFormProps {
  prefilledService?: string;
}

export function ContactForm({ prefilledService }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    service: prefilledService || '🚀 Criação de Landing Page para meu Negócio',
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
    { id: 'landing', label: '🚀 Criação de Landing Page para meu Negócio' },
    { id: 'site', label: '🌐 Site Profissional para Empresa' },
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
    const telefone = formData.phone?.trim() ? ` | Tel: ${formData.phone.trim()}` : '';
    const texto = `Olá! Meu nome é *${nome}*${telefone} e gostaria de solicitar um orçamento para *${servico}*.${detalhes}`;
    return `https://api.whatsapp.com/send?phone=5599999331639&text=${encodeURIComponent(texto)}`;
  };

  const handleSendWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Por favor, informe seu nome.');
      return;
    }

    setStatus('submitting');

    try {
      // Background persistent storage
      const record = await saveQuoteToDatabase({
        name: formData.name,
        phone: formData.phone || '(Via WhatsApp Direto)',
        service: formData.service,
        email: formData.email,
        message: formData.message,
        source: 'whatsapp_direct',
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

    setStatus('success');
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
    <section id="contato" className="py-16 md:py-24 relative bg-zinc-950 border-t border-zinc-900 overflow-hidden w-full max-w-full">
      {/* Background ambience */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none transform-gpu" />

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
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-semibold text-amber-400 mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Orçamento Rápido & Sem Compromisso</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Solicite Seu Orçamento em Menos de 1 Minuto
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-300">
            Landing Pages de alta conversão, sites profissionais para empresas ou vídeos em 4K. Receba uma proposta clara, ágil e pensada para o seu bolso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct WhatsApp & Trust */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            
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

            {/* Location, Email & Instagram info */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-400 space-y-2.5">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Maranhão (Gravações presenciais) & Todo Brasil</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contato@aneresstudio.com.br</span>
              </div>
              <a
                href="https://www.instagram.com/aneresstudio_/"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-instagram-link"
                className="flex items-center gap-2 text-zinc-300 hover:text-pink-400 transition-colors group"
                aria-label="Acompanhe o Instagram @aneresstudio_"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">Instagram: @aneresstudio_</span>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Ultra-Simple Fast Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-2xl relative">
              
              {/* WhatsApp Direct Header Card */}
              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-zinc-950/80 to-emerald-950/60 border border-emerald-500/30 mb-6">
                <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-zinc-950 shrink-0 shadow-lg shadow-emerald-500/20">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Orçamento Direto no WhatsApp
                    </h3>
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Online
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Atendimento imediato com a equipe • (99) 99933-1639
                  </p>
                </div>
              </div>

              {status === 'success' ? (
                /* Clean Visitor Success Screen */
                <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      Conversa Pronta no WhatsApp!
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300 max-w-sm mx-auto">
                      Olá, <strong className="text-white">{formData.name}</strong>! Se a janela do WhatsApp não tiver aberto automaticamente, clique no botão abaixo para nos enviar sua mensagem agora:
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
                      Montar outro orçamento
                    </button>
                  </div>
                </div>
              ) : (
                /* WhatsApp Quote Form */
                <form onSubmit={handleSendWhatsapp} className="space-y-4">
                  
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
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* 2. WhatsApp / Telefone */}
                  <div>
                    <label htmlFor="quote-phone" className="block text-xs font-semibold text-zinc-200 mb-1.5">
                      2. Seu Telefone / WhatsApp com DDD
                    </label>
                    <input
                      type="tel"
                      id="quote-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(99) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
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
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
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
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/80 text-base sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-whatsapp-quote-btn"
                      disabled={status === 'submitting'}
                      className="w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.01] cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>{status === 'submitting' ? 'Preparando Orçamento...' : 'Receber Orçamento no WhatsApp Agora'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-zinc-500 pt-1">
                    🔒 Sem compromisso e resposta rápida. Atendimento humano direto com a equipe.
                  </p>

                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
