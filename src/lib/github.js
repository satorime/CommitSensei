const BASE = 'https://api.github.com'

function buildHeaders() {
  const headers = { Accept: 'application/vnd.github.v3+json' }
  if (import.meta.env.VITE_GITHUB_TOKEN) {
    headers['Authorization'] = `token ${import.meta.env.VITE_GITHUB_TOKEN}`
  }
  return headers
}

async function request(path) {
  const res = await fetch(`${BASE}${path}`, { headers: buildHeaders() })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub API error ${res.status}`)
  }
  return res.json()
}

export async function fetchProfile(username) {
  return request(`/users/${username}`)
}

export async function fetchRepos(username) {
  return request(`/users/${username}/repos?per_page=100&sort=pushed&type=owner`)
}

export async function fetchEvents(username) {
  return request(`/users/${username}/events?per_page=100`)
}

export function aggregateLanguages(repos) {
  const counts = {}
  for (const repo of repos) {
    if (repo.language && !repo.fork) {
      counts[repo.language] = (counts[repo.language] || 0) + 1
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))
}

export function buildContributionMap(events) {
  const map = {}
  for (const event of events) {
    const date = event.created_at?.slice(0, 10)
    if (!date) continue
    const weight =
      event.type === 'PushEvent'
        ? (event.payload?.commits?.length || 1)
        : 1
    map[date] = (map[date] || 0) + weight
  }
  return map
}

export function getTopRepos(repos, n = 6) {
  return [...repos]
    .filter(r => !r.fork)
    .sort((a, b) => b.stargazers_count + b.forks_count - (a.stargazers_count + a.forks_count))
    .slice(0, n)
}
