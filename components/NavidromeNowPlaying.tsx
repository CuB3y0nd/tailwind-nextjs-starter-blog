'use client'

import React, { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'

interface NavidromeNowPlayingData {
  id: string
  title?: string
  artist?: string
  coverArt?: string
}

const API_BASE_URL = 'https://music.cubeyond.net/rest/'
const GET_NOW_PLAYING_URL = `${API_BASE_URL}getNowPlaying.view`
const GET_COVER_ART_URL = `${API_BASE_URL}getCoverArt`

const NAVIDROME_API_PARAMS = new URLSearchParams({
  u: siteMetadata.navidrome.user,
  t: siteMetadata.navidrome.token,
  s: siteMetadata.navidrome.salt,
  f: siteMetadata.navidrome.format,
  v: siteMetadata.navidrome.version,
  c: siteMetadata.navidrome.client,
})

const NavidromeNowPlaying: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<NavidromeNowPlayingData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nowPlayingResponse = await fetch(`${GET_NOW_PLAYING_URL}?${NAVIDROME_API_PARAMS}`)

        if (!nowPlayingResponse.ok) {
          throw new Error(`Response not OK - Now Playing: ${nowPlayingResponse.status}`)
        }

        const nowPlayingData = await nowPlayingResponse.json()

        let nowPlayingInfo: NavidromeNowPlayingData | null = null
        if (nowPlayingData?.['subsonic-response']?.nowPlaying?.entry) {
          const nowPlayingEntry = nowPlayingData['subsonic-response']['nowPlaying']['entry'][0]
          nowPlayingInfo = {
            id: nowPlayingEntry['id'] || '',
            title: nowPlayingEntry['title'] || '',
            artist: nowPlayingEntry['artist'] || '',
            coverArt: nowPlayingEntry['coverArt'] || '',
          }
        }

        setNowPlaying(nowPlayingInfo)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      console.log('Now Playing:', nowPlaying)
    }
  }, [isLoading, nowPlaying])

  return (
    <div className="w-full p-4 text-center sm:p-8">
      <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
        {isLoading ? (
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-green-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-green-500">
            <p>Fetching currently playing song...</p>
          </div>
        ) : nowPlaying ? (
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-green-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-green-500">
            <img
              className="mr-3"
              alt="Music Cover"
              width="40"
              height="40"
              decoding="async"
              data-nimg="1"
              style={{ color: `transparent` }}
              src={`${GET_COVER_ART_URL}?id=${nowPlaying?.coverArt}&${NAVIDROME_API_PARAMS}`}
            />
            <div className="text-left font-bold">
              <div className="mb-1">
                <p>Title: {nowPlaying?.title}</p>
              </div>
              <div className="-mt-1">
                <p>Artist: {nowPlaying?.artist}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-text dark:text-text-dark hover:bg-surface0 dark:hover:bg-surface0-dark inline-flex w-auto items-center justify-center rounded-md border-2 border-solid border-gray-300 bg-transparent bg-opacity-20 px-4 py-2.5 transition duration-500 hover:scale-105 hover:rounded-md hover:border-green-500 dark:border-gray-700 dark:bg-opacity-20 dark:hover:border-green-500">
            <p>Nothing playing...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavidromeNowPlaying
