import { Star, GitFork, BookOpen, Users, UserCheck } from 'lucide-react'

function formatNum(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

const STATS = (profile, totalStars, totalForks) => [
  { label: 'Repositories', value: profile.public_repos, icon: BookOpen, bg: 'bg-[#1040C0]', shape: '' },
  { label: 'Total Stars', value: totalStars, icon: Star, bg: 'bg-[#D02020]', shape: 'rounded-full' },
  { label: 'Total Forks', value: totalForks, icon: GitFork, bg: 'bg-[#121212]', shape: 'rotate-45' },
  { label: 'Followers', value: profile.followers, icon: Users, bg: 'bg-[#1040C0]', shape: 'rounded-full' },
  { label: 'Following', value: profile.following, icon: UserCheck, bg: 'bg-[#D02020]', shape: '' },
]

function StatBox({ label, value, icon: Icon, bg, shape }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white relative overflow-hidden hover:-translate-y-1 transition-transform duration-200">
      {/* Corner decoration */}
      <div className={`absolute top-3 right-3 w-4 h-4 ${bg} border-2 border-[#121212] ${shape}`} />
      {/* Icon container */}
      <div className={`w-12 h-12 flex items-center justify-center border-4 border-[#121212] mb-3 ${bg} shadow-[3px_3px_0px_0px_#121212]`}>
        <Icon className="w-5 h-5 text-white" strokeWidth={3} />
      </div>
      <span className="font-black text-4xl tracking-tighter tabular-nums">{formatNum(value)}</span>
      <span className="font-bold uppercase tracking-widest text-[10px] mt-1 text-[#121212]/50">{label}</span>
    </div>
  )
}

export default function StatsGrid({ profile, repos }) {
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0)
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0)
  const stats = STATS(profile, totalStars, totalForks)

  return (
    <section className="bg-[#F0C020] border-b-4 border-[#121212]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="px-6 sm:px-8 pt-8 pb-4 border-b-4 border-[#121212] flex items-center gap-3">
          <div className="w-3 h-3 bg-[#121212] rotate-45 flex-shrink-0" />
          <span className="font-black uppercase tracking-widest text-sm">Statistics</span>
        </div>
        {/* Grid with dividers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y-4 sm:divide-y-0 divide-x-0 sm:divide-x-4 divide-[#121212] border-b-4 sm:border-b-0 border-[#121212]">
          {stats.map(s => <StatBox key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  )
}
