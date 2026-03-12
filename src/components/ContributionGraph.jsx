const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function buildWeeks(contributionMap) {
  const today = new Date()
  // Start from 52 weeks ago, aligned to Sunday
  const start = new Date(today)
  start.setDate(start.getDate() - 364)
  start.setDate(start.getDate() - start.getDay())

  const weeks = []
  let week = []
  const cur = new Date(start)

  while (cur <= today) {
    const dateStr = cur.toISOString().slice(0, 10)
    week.push({ date: dateStr, count: contributionMap[dateStr] ?? 0 })
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
    cur.setDate(cur.getDate() + 1)
  }
  if (week.length > 0) {
    while (week.length < 7) week.push({ date: '', count: -1 })
    weeks.push(week)
  }
  return weeks
}

function intensity(count) {
  if (count < 0) return 'transparent'
  if (count === 0) return '#E0E0E0'
  if (count === 1) return 'rgba(16,64,192,0.25)'
  if (count <= 3) return 'rgba(16,64,192,0.55)'
  if (count <= 6) return '#1040C0'
  return '#D02020'
}

export default function ContributionGraph({ contributionMap }) {
  const weeks = buildWeeks(contributionMap)
  const total = Object.values(contributionMap).reduce((a, b) => a + b, 0)

  return (
    <section className="bg-[#F0F0F0] border-b-4 border-[#121212]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#1040C0] border-2 border-[#121212] rotate-45 flex-shrink-0" />
            <h2 className="font-black uppercase tracking-tighter text-2xl sm:text-3xl">
              Contribution Activity
            </h2>
          </div>
          <div className="border-4 border-[#121212] px-4 py-2 bg-white shadow-[3px_3px_0px_0px_#121212] flex items-baseline gap-2">
            <span className="font-black text-2xl tabular-nums">{total}</span>
            <span className="font-bold text-xs uppercase tracking-widest text-[#121212]/50">events</span>
          </div>
        </div>

        <p className="text-xs font-medium text-[#121212]/40 mb-6 uppercase tracking-wide">
          Based on public events — last ~90 days of data available via GitHub REST API
        </p>

        {/* Calendar */}
        <div className="overflow-x-auto pb-2">
          <div style={{ minWidth: 720 }}>
            {/* Month row */}
            <div className="flex gap-[3px] mb-1" style={{ marginLeft: 28 }}>
              {weeks.map((week, wi) => {
                const first = week.find(d => d.date)
                if (!first) return <div key={wi} style={{ width: 14 }} />
                const d = new Date(first.date)
                const show = d.getDate() <= 7
                return (
                  <div
                    key={wi}
                    style={{ width: 14, fontSize: 10 }}
                    className="font-bold text-[#121212]/40 overflow-visible whitespace-nowrap"
                  >
                    {show ? MONTHS[d.getMonth()] : ''}
                  </div>
                )
              })}
            </div>

            <div className="flex gap-[3px]">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-2">
                {DAYS.map((d, i) => (
                  <div
                    key={i}
                    style={{ width: 14, height: 14, fontSize: 10 }}
                    className="font-bold text-[#121212]/40 flex items-center justify-center"
                  >
                    {i % 2 === 0 ? d : ''}
                  </div>
                ))}
              </div>
              {/* Week columns */}
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      style={{
                        width: 14,
                        height: 14,
                        backgroundColor: intensity(day.count),
                        border: day.count >= 0 ? '1px solid rgba(18,18,18,0.08)' : 'none',
                      }}
                      title={day.date ? `${day.date}: ${day.count} event${day.count !== 1 ? 's' : ''}` : ''}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 justify-end">
              <span style={{ fontSize: 10 }} className="font-bold text-[#121212]/40 uppercase tracking-wider">
                Less
              </span>
              {[0, 1, 2, 3, 6, 8].map(c => (
                <div
                  key={c}
                  style={{ width: 14, height: 14, backgroundColor: intensity(c), border: '1px solid rgba(18,18,18,0.08)' }}
                />
              ))}
              <span style={{ fontSize: 10 }} className="font-bold text-[#121212]/40 uppercase tracking-wider">
                More
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
