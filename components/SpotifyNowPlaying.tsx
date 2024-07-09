'use client'

import React, { useState, useEffect } from 'react'

const client_id = process.env.SPOTIFY_CLIENT_ID || ''
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || ''
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || ''

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: {
    images: { url: string }[]
  }
  uri: string
}

interface SpotifyNowPlayingData {
  isPlaying: boolean
  item?: SpotifyTrack
}

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

  const data = await response.json()
  return data
}

const getNowPlaying = async (): Promise<SpotifyNowPlayingData> => {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (response.status === 204 || response.status > 400) {
      return { isPlaying: false }
    }

    if (!response.ok) {
      throw new Error(`Failed to get now playing data: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return {
      isPlaying: data.is_playing,
      item: data.item
        ? {
            name: data.item.name,
            artists: data.item.artists.map((artist: { name: string }) => ({ name: artist.name })),
            album: {
              images: data.item.album.images,
            },
            uri: data.item.uri,
          }
        : undefined,
    }
  } catch (error) {
    console.error('Error fetching now playing data:', error)
    return { isPlaying: false }
  }
}

const getRecentlyPlayed = async (): Promise<SpotifyTrack | null> => {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to get recently played data: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    const recentlyPlayedItem = data.items[0]?.track

    return recentlyPlayedItem
      ? {
          name: recentlyPlayedItem.name,
          artists: recentlyPlayedItem.artists.map((artist: { name: string }) => ({
            name: artist.name,
          })),
          album: {
            images: recentlyPlayedItem.album.images,
          },
          uri: recentlyPlayedItem.uri,
        }
      : null
  } catch (error) {
    console.error('Error fetching recently played data:', error)
    return null
  }
}

const NowPlaying: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<SpotifyNowPlayingData | null>(null)
  const [recentlyPlayed, setRecentlyPlayed] = useState<SpotifyTrack | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nowPlayingData = await getNowPlaying()
        setNowPlaying(nowPlayingData)

        if (!nowPlayingData.isPlaying) {
          const recentlyPlayedData = await getRecentlyPlayed()
          setRecentlyPlayed(recentlyPlayedData)
        }
      } catch (error) {
        setError('Error fetching data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (error) {
    return (
      <div className="w-full p-4 text-center sm:p-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="w-full p-4 text-center sm:p-8">
      <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
        {isLoading ? (
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-green-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-green-500">
            <p>Fetching currently playing song...</p>
          </div>
        ) : nowPlaying?.isPlaying && nowPlaying.item ? (
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-green-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-green-500">
            <a
              href={`https://open.spotify.com/track/${nowPlaying.item.uri.split(':')[2]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="mr-3"
                alt="Album Art"
                width="40"
                height="40"
                decoding="async"
                data-nimg="1"
                style={{ color: `transparent` }}
                src={nowPlaying.item.album.images[0]?.url}
              />
            </a>
            <div className="text-left font-bold">
              <div className="mb-1">
                <p>Title: {nowPlaying.item.name}</p>
              </div>
              <div className="-mt-1">
                <p>Artist: {nowPlaying.item.artists.map((artist) => artist.name).join(', ')}</p>
              </div>
            </div>
          </div>
        ) : recentlyPlayed ? (
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-yellow-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-yellow-500">
            <a
              href={`https://open.spotify.com/track/${recentlyPlayed.uri.split(':')[2]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="mr-3"
                alt="Album Art"
                width="40"
                height="40"
                decoding="async"
                data-nimg="1"
                style={{ color: `transparent` }}
                src={recentlyPlayed.album.images[0]?.url}
              />
            </a>
            <div className="text-left font-bold">
              <div className="mb-1">
                <p>Last Played: {recentlyPlayed.name}</p>
              </div>
              <div className="-mt-1">
                <p>Artist: {recentlyPlayed.artists.map((artist) => artist.name).join(', ')}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-red-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-red-500">
            <p>Nothing playing...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NowPlaying
