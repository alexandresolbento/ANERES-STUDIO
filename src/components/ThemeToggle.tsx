import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'segmented' | 'pill' | 'icon' | 'row' | 'badge';
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({
  variant = 'segmented',
  className = '',
  showLabel = true,
}: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  const titleText = isDark
    ? 'Alternar para Modo Claro'
    : 'Alternar para Modo Escuro';

  // High-priority segmented switch (Claro / Escuro with active indicator)
  if (variant === 'segmented') {
    return (
      <div
        role="group"
        aria-label="Padrão visual: Modo Claro ou Modo Escuro"
        className={`inline-flex items-center p-0.5 sm:p-1 rounded-full bg-slate-200/90 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 shadow-inner select-none transition-colors shrink-0 ${className}`}
      >
        <button
          type="button"
          onClick={() => isDark && toggleTheme()}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
            !isDark
              ? 'bg-white text-slate-950 shadow-sm border border-slate-300/80 font-black'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 font-semibold'
          }`}
          title="Ativar Modo Claro"
          aria-label="Ativar Modo Claro"
          aria-pressed={!isDark}
        >
          <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500/20 scale-105' : 'text-zinc-400'}`} />
          <span className="hidden min-[400px]:inline">Claro</span>
        </button>

        <button
          type="button"
          onClick={() => !isDark && toggleTheme()}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
            isDark
              ? 'bg-zinc-800 text-amber-400 shadow-sm border border-zinc-700 font-black'
              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-300/40 font-semibold'
          }`}
          title="Ativar Modo Escuro"
          aria-label="Ativar Modo Escuro"
          aria-pressed={isDark}
        >
          <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400 fill-amber-400/20 scale-105' : 'text-slate-600'}`} />
          <span className="hidden min-[400px]:inline">Escuro</span>
        </button>
      </div>
    );
  }

  // Row layout for menus and cards
  if (variant === 'row') {
    return (
      <div
        className={`w-full flex items-center justify-between p-3 rounded-2xl bg-slate-100/90 dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-2xs">
            {isDark ? (
              <Moon className="w-4 h-4 text-amber-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <div>
            <span className="text-xs font-bold block text-slate-900 dark:text-white">
              Padrão Visual
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400 block">
              Ativo: <strong>{isDark ? 'Modo Escuro' : 'Modo Claro'}</strong>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-zinc-800 text-slate-900 dark:text-amber-400 border border-slate-300 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors shadow-2xs cursor-pointer"
        >
          {isDark ? 'Mudar p/ Claro' : 'Mudar p/ Escuro'}
        </button>
      </div>
    );
  }

  // Pill toggle button with icon and label
  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 dark:text-zinc-200 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-700 transition-all cursor-pointer shadow-xs ${className}`}
        aria-label={titleText}
        title={titleText}
      >
        {isDark ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            {showLabel && <span>Modo Claro</span>}
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-slate-700" />
            {showLabel && <span>Modo Escuro</span>}
          </>
        )}
      </button>
    );
  }

  // Subtle icon variant
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative p-2 rounded-xl text-slate-600 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-slate-200 dark:border-zinc-800 transition-all cursor-pointer flex items-center justify-center shrink-0 ${className}`}
      aria-label={titleText}
      title={titleText}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
        )}
      </div>
      {showLabel && (
        <span className="ml-1.5 text-xs font-bold hidden lg:inline">
          {isDark ? 'Claro' : 'Escuro'}
        </span>
      )}
    </button>
  );
}
