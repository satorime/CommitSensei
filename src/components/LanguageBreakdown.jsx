const COLORS = [
  '#1040C0', '#D02020', '#F0C020', '#121212',
  '#4060D0', '#E04040', '#D0A000', '#606060',
]

const SHAPES = [
  'rounded-none',
  'rounded-full',
  'rotate-45',
  'rounded-none',
  'rounded-full',
  'rotate-45',
  'rounded-none',
  'rounded-full',
]

export default function LanguageBreakdown({ languages }) {
  if (!languages.length) return null

  const total = languages.reduce((s, l) => s + l.count, 0)
  const top = languages.slice(0, 8)

  return (
    <section className="bg-white border-b-4 border-[#121212]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-5 h-5 rounded-full bg-[#D02020] border-2 border-[#121212] flex-shrink-0" />
          <h2 className="font-black uppercase tracking-tighter text-2xl sm:text-3xl">
            Language Breakdown
          </h2>
        </div>

        {/* Stacked bar */}
        <div className="flex h-8 border-4 border-[#121212] overflow-hidden shadow-[4px_4px_0px_0px_#121212] mb-8">
          {top.map((lang, i) => (
            <div
              key={lang.name}
              title={`${lang.name}: ${Math.round((lang.count / total) * 100)}%`}
              style={{
                width: `${(lang.count / total) * 100}%`,
                backgroundColor: COLORS[i % COLORS.length],
                minWidth: 2,
              }}
              className="relative group cursor-default hover:opacity-80 transition-opacity duration-200"
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {top.map((lang, i) => (
            <div
              key={lang.name}
              className="flex items-center gap-3 p-3 border-2 border-[#121212] bg-[#F0F0F0] shadow-[2px_2px_0px_0px_#121212] hover:-translate-y-px hover:shadow-[2px_3px_0px_0px_#121212] transition-all duration-200"
            >
              <div
                className={`w-4 h-4 flex-shrink-0 border-2 border-[#121212] ${SHAPES[i % SHAPES.length]}`}
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{lang.name}</p>
                <p className="font-medium text-xs text-[#121212]/55">
                  {Math.round((lang.count / total) * 100)}% · {lang.count}{' '}
                  {lang.count === 1 ? 'repo' : 'repos'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
