import { useState } from 'react'
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react'
import { generateRepoSummary } from '../lib/claude'

export default function AIRepoSummary({ repos }) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleGenerate() {
    setLoading(true)
    setError(null)
    try {
      const text = await generateRepoSummary(repos)
      setSummary(text)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const hasApiKey = !!import.meta.env.VITE_ANTHROPIC_API_KEY

  return (
    <section className="bg-[#D02020] border-b-4 border-[#121212]">
      {/* Dot pattern */}
      <div
        className="relative"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* Label */}
            <div className="lg:w-56 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#F0C020] border-2 border-[#121212]" />
                <span className="font-bold uppercase tracking-widest text-xs text-white/70">
                  AI Powered
                </span>
              </div>
              <h2 className="font-black uppercase tracking-tighter text-3xl sm:text-4xl text-white leading-tight mb-4">
                Developer<br />Profile
              </h2>
              <p className="font-medium text-white/65 text-sm leading-relaxed">
                Claude AI analyzes top repositories to surface skills and focus areas.
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Idle */}
              {!summary && !loading && !error && (
                <div className="border-4 border-[#121212] bg-white/10 p-8 flex flex-col items-center text-center min-h-[180px] justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center mb-5 shadow-[4px_4px_0px_0px_#121212]">
                    <Sparkles className="w-8 h-8 text-[#F0C020]" />
                  </div>
                  <p className="font-bold text-white text-lg mb-6">
                    Generate an AI-powered summary of this developer
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="px-8 py-3 bg-[#F0C020] text-[#121212] border-4 border-[#121212] font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#121212] hover:bg-[#F0C020]/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200"
                  >
                    Generate Summary
                  </button>
                  {!hasApiKey && (
                    <p className="mt-3 text-xs text-white/45 font-medium">
                      Requires <code className="font-mono">VITE_ANTHROPIC_API_KEY</code> in .env
                    </p>
                  )}
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="border-4 border-[#121212] bg-white/10 p-8 flex items-center justify-center min-h-[180px] gap-4">
                  <div className="w-8 h-8 border-4 border-white border-t-[#F0C020] rounded-full animate-spin flex-shrink-0" />
                  <span className="font-bold text-white uppercase tracking-wider">
                    Analyzing repositories…
                  </span>
                </div>
              )}

              {/* Error */}
              {error && !loading && (
                <div className="border-4 border-[#F0C020] bg-[#F0C020]/10 p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#F0C020] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white mb-1">Couldn't generate summary</p>
                      <p className="font-medium text-white/70 text-sm">{error}</p>
                      <button
                        onClick={handleGenerate}
                        className="mt-4 px-4 py-2 border-2 border-white text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-[#D02020] transition-colors duration-200"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary */}
              {summary && !loading && (
                <div className="border-4 border-[#121212] bg-white shadow-[6px_6px_0px_0px_#121212] p-6 relative">
                  {/* Quote mark */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[#F0C020] border-2 border-[#121212] flex items-center justify-center">
                    <span className="font-black text-lg leading-none select-none">"</span>
                  </div>
                  <p className="font-medium text-lg leading-relaxed text-[#121212] pr-12">{summary}</p>
                  <div className="mt-5 pt-4 border-t-2 border-[#121212] flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D02020] border border-[#121212]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#121212]/45">
                      Claude AI · claude-haiku-4-5
                    </span>
                    <button
                      onClick={handleGenerate}
                      className="ml-auto flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#121212]/40 hover:text-[#D02020] transition-colors duration-200"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
