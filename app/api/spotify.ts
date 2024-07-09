import type { NextApiRequest, NextApiResponse } from 'next'

const client_id = process.env.SPOTIFY_CLIENT_ID || ''
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || ''
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || ''

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

const getNowPlaying = async (access_token: string) => {
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (response.status === 204 || response.status > 400) {
    return null
  }

  return response.json()
}

const getRecentlyPlayed = async (access_token: string) => {
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to get recently played data: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.items[0]?.track || null
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { access_token } = await getAccessToken()
    const nowPlaying = await getNowPlaying(access_token)

    if (nowPlaying && nowPlaying.is_playing) {
      res.status(200).json(nowPlaying)
    } else {
      const recentlyPlayed = await getRecentlyPlayed(access_token)
      res.status(200).json({ isPlaying: false, item: recentlyPlayed })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
