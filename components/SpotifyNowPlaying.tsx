'use client'

import React, { useState, useEffect } from 'react'

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

const NowPlaying: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<SpotifyNowPlayingData | null>(null)
  const [recentlyPlayed, setRecentlyPlayed] = useState<SpotifyTrack | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify')
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setNowPlaying(data)
        if (!data.isPlaying) {
          setRecentlyPlayed(data.item || null)
        } else {
          setRecentlyPlayed(null)
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
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark relative inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-green-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-green-500">
            <a
              href={`https://open.spotify.com/track/${nowPlaying.item.uri.split(':')[2]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
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
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark relative inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-yellow-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-yellow-500">
            <a
              href={`https://open.spotify.com/track/${recentlyPlayed.uri.split(':')[2]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
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
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-gray-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-gray-500">
            <p>Nothing playing...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NowPlaying
