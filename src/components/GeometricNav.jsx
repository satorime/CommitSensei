import { Github } from 'lucide-react'

export default function GeometricNav({ onReset }) {
  return (
    <nav className="border-b-4 border-[#121212] bg-[#F0F0F0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onReset}
          className="flex items-center gap-3 group"
          aria-label="Go to home"
        >
          {/* Bauhaus geometric mark: circle + square + triangle */}
          <div className="flex items-center gap-[3px]">
            <div className="w-4 h-4 rounded-full bg-[#D02020] border-2 border-[#121212] group-hover:scale-110 transition-transform duration-200" />
            <div className="w-4 h-4 bg-[#1040C0] border-2 border-[#121212] group-hover:scale-110 transition-transform duration-200 delay-[25ms]" />
            <div
              className="group-hover:scale-110 transition-transform duration-200 delay-[50ms]"
              style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '14px solid #F0C020',
                filter: 'drop-shadow(0 0 0 2px #121212)',
              }}
            />
          </div>
          <span className="font-black uppercase tracking-tighter text-xl text-[#121212] leading-none">
            CommitSensei
          </span>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border-2 border-[#121212] bg-white shadow-[2px_2px_0px_0px_#121212]">
            <Github className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider text-xs">GitHub Analyzer</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
