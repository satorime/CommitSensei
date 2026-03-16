import { useState } from 'react'
import GeometricNav from './components/GeometricNav'
import SearchHero from './components/SearchHero'
import ProfileCard from './components/ProfileCard'
import StatsGrid from './components/StatsGrid'
import LanguageBreakdown from './components/LanguageBreakdown'
import ContributionGraph from './components/ContributionGraph'
import RepoGrid from './components/RepoGrid'
import { fetchProfile, fetchRepos, fetchEvents, aggregateLanguages, buildContributionMap } from './lib/github'
import { ExternalLink } from 'lucide-react'

const PORTFOLIO_KEYWORDS = ['.dev', 'netlify', 'vercel', 'render', 'railway']

function findPortfolioUrl(profile, repos) {
  const candidates = [
    profile.blog,
    ...repos.map(r => r.homepage),
  ]
  for (const url of candidates) {
    if (!url) continue
    const lower = url.toLowerCase()
    if (PORTFOLIO_KEYWORDS.some(kw => lower.includes(kw))) {
      return url.startsWith('http') ? url : `https://${url}`
    }
  }
  return null
}

export default function App() {
  const [view, setView] = useState('search')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  async function handleSearch(username) {
    setLoading(true)
    setError(null)
    try {
      const [profile, repos, events] = await Promise.all([
        fetchProfile(username),
        fetchRepos(username),
        fetchEvents(username).catch(() => []),
      ])
      setData({
        profile,
        repos,
        languages: aggregateLanguages(repos),
        contributionMap: buildContributionMap(events),
      })
      setView('profile')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setView('search')
    setData(null)
    setError(null)
  }

  const portfolioUrl = data ? findPortfolioUrl(data.profile, data.repos) : null

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-sans">
      <GeometricNav onReset={handleReset} />

      {/* ── Search view ── */}
      {view === 'search' && (
        <>
          <SearchHero onSearch={handleSearch} loading={loading} />
          {error && (
            <div className="max-w-2xl mx-auto mt-8 px-4">
              <div className="border-4 border-[#D02020] bg-white p-5 shadow-[4px_4px_0px_0px_#D02020]">
                <p className="font-bold uppercase tracking-wider text-[#D02020] mb-1">Error</p>
                <p className="font-medium text-[#121212]">{error}</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Profile view ── */}
      {view === 'profile' && data && (
        <>
          {/* Profile header */}
          <div className="border-b-4 border-[#121212] bg-[#F0F0F0]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <ProfileCard profile={data.profile} />
              </div>
              {portfolioUrl && (
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start flex items-center gap-2 px-6 py-3 bg-[#F0C020] border-4 border-[#121212] font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_#121212] hover:bg-[#F0C020]/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 flex-shrink-0"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Portfolio
                </a>
              )}
            </div>
          </div>

          <StatsGrid profile={data.profile} repos={data.repos} />
          <LanguageBreakdown languages={data.languages} />
          <ContributionGraph contributionMap={data.contributionMap} />
          <RepoGrid repos={data.repos} />

          {/* Footer */}
          <footer className="bg-[#121212] py-8 px-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-[3px]">
                  <div className="w-3 h-3 rounded-full bg-[#D02020]" />
                  <div className="w-3 h-3 bg-[#1040C0]" />
                  <div
                    style={{
                      width: 0, height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderBottom: '10px solid #F0C020',
                    }}
                  />
                </div>
                <span className="font-black uppercase tracking-tighter text-white">CommitSensei</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium text-white/35">© 2026 Brix Bitayo</span>
                <span className="text-white/20">·</span>
                <span className="font-medium text-white/35">All rights reserved</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
