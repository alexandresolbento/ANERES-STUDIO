import { Component, ErrorInfo, ReactNode } from 'react';
import { aiSelfHealer } from '../services/aiSelfHealer';

interface Props {
  children: ReactNode;
  fallbackName?: string;
}

interface State {
  hasError: boolean;
  errorCount: number;
}

/**
 * AIErrorBoundary
 * Guardião invisível: captura falhas de renderização em tempo de execução,
 * aciona a inteligência artificial para diagnosticar a causa raiz no backend,
 * e auto-recupera a interface de forma 100% silenciosa e oculta para o visitante.
 */
export class AIErrorBoundary extends Component<Props, State> {
  private recoveryTimer: number | null = null;
  private lastErrorTime = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const now = Date.now();
    const isRapidLoop = now - this.lastErrorTime < 2000;
    this.lastErrorTime = now;

    // Dispara diagnóstico e auto-correção com IA em background
    aiSelfHealer.recordAndAutoRepair({
      type: 'REACT_RENDER_CRASH',
      errorMessage: error.message || 'Erro de renderização contornado',
      errorStack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
      appContext: {
        section: this.props.fallbackName || 'Componente da Interface',
        silent: true,
      },
    }).catch(() => {
      // Ignora falhas silenciosamente
    });

    const newCount = isRapidLoop ? this.state.errorCount + 1 : 1;
    this.setState({ errorCount: newCount });

    // Se não for um loop infinito crítico, auto-recupera instantaneamente
    if (newCount <= 3) {
      if (this.recoveryTimer) window.clearTimeout(this.recoveryTimer);
      this.recoveryTimer = window.setTimeout(() => {
        this.setState({ hasError: false });
      }, 100);
    }
  }

  componentWillUnmount() {
    if (this.recoveryTimer) {
      window.clearTimeout(this.recoveryTimer);
    }
  }

  render() {
    if (this.state.hasError) {
      // Se excedeu tentativas em milissegundos, renderiza container neutro sem quebrar o layout
      if (this.state.errorCount > 3) {
        return null;
      }
    }

    return this.props.children;
  }
}
