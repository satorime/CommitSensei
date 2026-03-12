import { Star, GitFork, ExternalLink } from 'lucide-react'

const LANG_COLORS = {
  JavaScript: '#F0C020',
  TypeScript: '#1040C0',
  Python: '#D02020',
  Rust: '#D02020',
  Go: '#1040C0',
  Java: '#D02020',
  'C++': '#1040C0',
  C: '#121212',
  Ruby: '#D02020',
  PHP: '#1040C0',
  Swift: '#D02020',
  Kotlin: '#1040C0',
  Dart: '#1040C0',
  HTML: '#D02020',
  CSS: '#1040C0',
  Shell: '#121212',
}

const DECORATIONS = [
  { shape: 'rounded-full', bg: '#D02020' },
  { shape: '', bg: '#1040C0' },
  { shape: 'rounded-full', bg: '#F0C020' },
  { shape: 'rotate-45', bg: '#D02020' },
  { shape: '', bg: '#F0C020' },
  { shape: 'rounded-full', bg: '#1040C0' },
]

export default function RepoCard({ repo, index }) {
  const langColor = LANG_COLORS[repo.language] || '#121212'
  const dec = DECORATIONS[index % DECORATIONS.length]
  const updatedAt = new Date(repo.pushed_at).toLocaleDateString('en-US', {
    month: 'short', year: 'numeric',
  })

  return (
    <div className="bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_#121212] hover:-translate-y-1 hover:shadow-[6px_7px_0px_0px_#121212] transition-all duration-200 flex flex-col relative overflow-hidden">
      {/* Corner shape */}
      <div
        className={`absolute top-3 right-3 w-4 h-4 border-2 border-[#121212] ${dec.shape}`}
        style={{ backgroundColor: dec.bg }}
      />
      {/* Language color bar */}
      <div className="h-2 flex-shrink-0" style={{ backgroundColor: langColor }} />

      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <div className="mb-2 pr-6">
          <h3 className="font-black text-base uppercase tracking-tight leading-tight">{repo.name}</h3>
          {repo.fork && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#121212]/40">Forked</span>
          )}
        </div>

        {/* Description */}
        <p className="font-medium text-sm text-[#121212]/65 leading-relaxed flex-1 mb-4">
          {repo.description || 'No description.'}
        </p>

        {/* Topics */}
        {repo.topics?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {repo.topics.slice(0, 3).map(t => (
              <span
                key={t}
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-2 border-[#121212] bg-[#F0F0F0]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t-2 border-[#121212]">
          <div className="flex items-center gap-3 flex-wrap">
            {repo.language && (
              <div className="flex items-center gap-1">
                <div
                  className="w-2.5 h-2.5 rounded-full border border-[#121212]"
                  style={{ backgroundColor: langColor }}
                />
                <span className="text-xs font-bold">{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-xs font-bold">
              <Star className="w-3 h-3" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold">
              <GitFork className="w-3 h-3" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${repo.name} on GitHub`}
            className="p-1.5 border-2 border-[#121212] bg-[#121212] text-white shadow-[2px_2px_0px_0px_#D02020] hover:bg-[#1040C0] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
