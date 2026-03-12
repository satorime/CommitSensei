import { useState } from 'react'
import RepoCard from './RepoCard'
import { ChevronDown } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Updated' },
  { value: 'name', label: 'Name A–Z' },
]

export default function RepoGrid({ repos }) {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('stars')
  const [shown, setShown] = useState(12)

  const filtered = repos
    .filter(r => {
      if (!filter) return true
      const q = filter.toLowerCase()
      return (
        r.name.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.language?.toLowerCase().includes(q) ||
        r.topics?.some(t => t.includes(q))
      )
    })
    .sort((a, b) => {
      if (sort === 'stars') return b.stargazers_count - a.stargazers_count
      if (sort === 'forks') return b.forks_count - a.forks_count
      if (sort === 'updated') return new Date(b.pushed_at) - new Date(a.pushed_at)
      if (sort === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  const visible = filtered.slice(0, shown)
  const remaining = filtered.length - shown

  return (
    <section className="bg-[#F0F0F0] border-b-4 border-[#121212]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#D02020] border-2 border-[#121212] flex-shrink-0" />
            <h2 className="font-black uppercase tracking-tighter text-2xl sm:text-3xl">
              Repositories
              <span className="ml-2 text-[#121212]/35 font-black text-xl">
                {repos.length}
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter */}
            <input
              type="text"
              value={filter}
              onChange={e => { setFilter(e.target.value); setShown(12) }}
              placeholder="Filter repos..."
              className="px-3 py-2 border-2 border-[#121212] text-sm font-medium bg-white focus:outline-none focus:border-[#1040C0] w-36 shadow-[2px_2px_0px_0px_#121212]"
            />
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border-2 border-[#121212] text-sm font-bold uppercase bg-white focus:outline-none cursor-pointer shadow-[2px_2px_0px_0px_#121212]"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 border-4 border-dashed border-[#121212]/25">
            <p className="font-black uppercase tracking-wider text-xl text-[#121212]/30">
              No repositories found
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {visible.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
            {remaining > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShown(s => s + 12)}
                  className="px-8 py-3 border-4 border-[#121212] bg-white font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_#121212] hover:bg-[#F0C020] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200"
                >
                  Load {Math.min(12, remaining)} more
                  <span className="ml-2 text-[#121212]/40">({remaining} left)</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
