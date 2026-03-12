import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'

const EXAMPLES = ['torvalds', 'gaearon', 'sindresorhus', 'antirez']

export default function SearchHero({ onSearch, loading }) {
  const [username, setUsername] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (username.trim()) onSearch(username.trim())
  }

  function tryExample(name) {
    setUsername(name)
    onSearch(name)
  }

  return (
    <section className="min-h-[calc(100vh-64px)] border-b-4 border-[#121212] flex relative overflow-hidden">
      {/* ─── Left panel ─── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 self-start">
          <div className="w-3 h-3 rounded-full bg-[#D02020] border-2 border-[#121212]" />
          <span className="font-bold uppercase tracking-widest text-xs">
            GitHub Profile Analyzer
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-black uppercase tracking-tighter leading-[0.9] text-5xl sm:text-7xl lg:text-[5.5rem] mb-8">
          ANALYZE
          <br />
          <span className="text-[#1040C0]">ANY</span>
          <br />
          GITHUB
          <br />
          PROFILE
        </h1>

        <p className="font-medium text-lg leading-relaxed max-w-md mb-10 text-[#121212]/70">
          Repo statistics, language breakdowns, contribution graphs,
          and AI-powered insights — built as a Bauhaus composition.
        </p>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#121212]/40" />
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="github-username"
              className="w-full pl-12 pr-4 py-4 border-4 border-[#121212] sm:border-r-0 font-medium text-lg bg-white focus:outline-none focus:bg-[#F0C020]/10 transition-colors placeholder:text-[#121212]/30"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="px-8 py-4 bg-[#1040C0] text-white border-4 border-[#121212] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#121212] hover:bg-[#0d35a0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
            <span>{loading ? 'Loading...' : 'Analyze'}</span>
          </button>
        </form>

        {/* Quick examples */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-bold uppercase tracking-widest text-xs text-[#121212]/50">Try:</span>
          {EXAMPLES.map(name => (
            <button
              key={name}
              onClick={() => tryExample(name)}
              disabled={loading}
              className="font-mono text-xs px-3 py-1.5 border-2 border-[#121212] bg-white shadow-[2px_2px_0px_0px_#121212] hover:-translate-y-px hover:shadow-[2px_3px_0px_0px_#121212] active:translate-y-px active:shadow-none transition-all duration-150 disabled:opacity-50"
            >
              @{name}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Right panel — Blue geometric composition ─── */}
      <div className="hidden lg:flex w-[400px] xl:w-[480px] bg-[#1040C0] border-l-4 border-[#121212] relative overflow-hidden items-center justify-center flex-shrink-0">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Large hollow circle */}
        <div className="absolute top-12 right-12 w-56 h-56 rounded-full border-4 border-white/20" />
        {/* Filled yellow circle */}
        <div className="w-44 h-44 rounded-full bg-[#F0C020] border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] z-10" />
        {/* Rotated red square */}
        <div className="absolute bottom-20 left-8 w-28 h-28 bg-[#D02020] border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] rotate-45 z-10" />
        {/* Small white square */}
        <div className="absolute top-1/2 right-6 -translate-y-1/2 w-16 h-16 bg-white border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-10" />
        {/* Bottom tagline */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <span className="font-black uppercase tracking-widest text-xs text-white/60">
            Form Follows Function
          </span>
        </div>
      </div>
    </section>
  )
}
