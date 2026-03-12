import { useState } from 'react'
import { X, Download, Copy, Check, Sparkles, AlertCircle } from 'lucide-react'
import { generatePortfolio } from '../lib/claude'

export default function PortfolioModal({ profile, repos, onClose }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    setError(null)
    try {
      const text = await generatePortfolio(profile, repos)
      setContent(text)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    if (!content) return
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!content) return
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${profile.login}-portfolio.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const hasApiKey = !!import.meta.env.VITE_ANTHROPIC_API_KEY

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#121212]/75"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-[#F0F0F0] border-4 border-[#121212] shadow-[8px_8px_0px_0px_#D02020] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-4 border-[#121212] bg-[#F0C020] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-[#121212] flex-shrink-0" />
            <h3 className="font-black uppercase tracking-tighter text-xl">Portfolio Generator</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 border-2 border-[#121212] bg-white shadow-[2px_2px_0px_0px_#121212] hover:bg-[#D02020] hover:text-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Idle */}
          {!content && !loading && (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-20 h-20 rounded-full border-4 border-[#121212] bg-[#1040C0] flex items-center justify-center mb-5 shadow-[4px_4px_0px_0px_#121212]">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-black uppercase tracking-tight text-2xl mb-2">
                Generate Portfolio
              </h4>
              <p className="font-medium text-[#121212]/60 mb-6 max-w-sm">
                Creates a professional Markdown portfolio from{' '}
                <strong>@{profile.login}</strong>'s top repositories.
              </p>
              {error && (
                <div className="w-full border-4 border-[#D02020] bg-[#D02020]/10 p-4 mb-5 text-left">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#D02020] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#D02020] text-sm mb-1">Generation failed</p>
                      <p className="font-medium text-sm text-[#121212]/70">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handleGenerate}
                className="px-8 py-3 bg-[#1040C0] text-white border-4 border-[#121212] font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#121212] hover:bg-[#0d35a0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200"
              >
                {error ? 'Try Again' : 'Generate Portfolio'}
              </button>
              {!hasApiKey && (
                <p className="mt-3 text-xs text-[#121212]/40 font-medium">
                  Requires <code className="font-mono">VITE_ANTHROPIC_API_KEY</code> in .env
                </p>
              )}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-[#121212] border-t-[#1040C0] rounded-full animate-spin" />
              <p className="font-bold uppercase tracking-wider text-[#121212]/60">
                Generating portfolio…
              </p>
            </div>
          )}

          {/* Result */}
          {content && !loading && (
            <pre className="font-mono text-sm bg-white border-4 border-[#121212] p-5 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-[4px_4px_0px_0px_#121212] text-[#121212]">
              {content}
            </pre>
          )}
        </div>

        {/* Footer */}
        {content && !loading && (
          <div className="p-4 border-t-4 border-[#121212] flex gap-3 flex-shrink-0 bg-[#F0F0F0]">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-3 border-4 border-[#121212] bg-white font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_#121212] hover:bg-[#F0C020] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Markdown'}
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 py-3 border-4 border-[#121212] bg-[#1040C0] text-white font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_#121212] hover:bg-[#0d35a0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Download .md
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
