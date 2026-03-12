import Anthropic from '@anthropic-ai/sdk'

let client = null

function getClient() {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('Add VITE_ANTHROPIC_API_KEY to your .env file to use AI features.')
  if (!client) {
    client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
  }
  return client
}

export async function generateRepoSummary(repos) {
  const ai = getClient()
  const topRepos = repos
    .filter(r => !r.fork)
    .slice(0, 10)
    .map(r => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      topics: r.topics?.slice(0, 5),
    }))

  const msg = await ai.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [
      {
        role: 'user',
        content: `Analyze these GitHub repositories and write a concise 3-sentence developer profile. Be specific about technologies, domains, and what makes their work distinctive. No bullet points — flowing prose only.\n\nRepositories:\n${JSON.stringify(topRepos, null, 2)}`,
      },
    ],
  })
  return msg.content[0].text
}

export async function generatePortfolio(profile, repos) {
  const ai = getClient()
  const topRepos = repos
    .filter(r => !r.fork)
    .slice(0, 8)
    .map(r => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      url: r.html_url,
      topics: r.topics?.slice(0, 4),
    }))

  const msg = await ai.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `Create a professional Markdown portfolio for this GitHub developer.

Profile:
${JSON.stringify({ name: profile.name, bio: profile.bio, location: profile.location, followers: profile.followers, public_repos: profile.public_repos }, null, 2)}

Top Repositories:
${JSON.stringify(topRepos, null, 2)}

Format exactly like this:
# [Full Name] — Developer Portfolio

## About
[2-3 sentence professional bio highlighting their technical strengths and focus areas]

## Featured Projects

### [Project Name]
**[Primary Language]** · ⭐ [stars]
[One-sentence description of what it does and why it matters]
[GitHub URL]

[Repeat for each project]

## Skills & Technologies
[Comma-separated list of languages and frameworks from their repos]

## Contact
- GitHub: [profile URL]
- Location: [location if available]`,
      },
    ],
  })
  return msg.content[0].text
}
