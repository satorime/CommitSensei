import { MapPin, LinkIcon, Calendar, Users } from 'lucide-react'

export default function ProfileCard({ profile }) {
  const joinYear = new Date(profile.created_at).getFullYear()

  return (
    <div className="bg-white border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] relative overflow-hidden">
      {/* Top accent bar */}
      <div className="h-3 bg-[#1040C0]" />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] grayscale hover:grayscale-0 transition-all duration-300"
            />
            {/* Corner dot */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#F0C020] border-2 border-[#121212]" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
              <div>
                <h2 className="font-black uppercase tracking-tighter text-3xl sm:text-4xl leading-tight">
                  {profile.name || profile.login}
                </h2>
                <p className="font-bold text-[#1040C0] tracking-wider text-sm">@{profile.login}</p>
              </div>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start px-4 py-2 border-2 border-[#121212] bg-[#121212] text-white font-bold uppercase tracking-wider text-sm shadow-[3px_3px_0px_0px_#D02020] hover:bg-[#1040C0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 flex-shrink-0"
              >
                View on GitHub ↗
              </a>
            </div>

            {profile.bio && (
              <p className="mt-3 font-medium leading-relaxed text-[#121212]/75 max-w-xl">
                {profile.bio}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D02020] flex-shrink-0" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.blog && (
                <a
                  href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#1040C0] hover:underline"
                >
                  <LinkIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate max-w-[200px]">
                    {profile.blog.replace(/^https?:\/\//, '')}
                  </span>
                </a>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#F0C020] stroke-[3]" />
                <span>Joined {joinYear}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>{profile.followers}</strong> followers ·{' '}
                  <strong>{profile.following}</strong> following
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner triangle decoration */}
      <div
        className="absolute top-3 right-0"
        style={{
          width: 0,
          height: 0,
          borderTop: '24px solid #D02020',
          borderLeft: '24px solid transparent',
        }}
      />
    </div>
  )
}
