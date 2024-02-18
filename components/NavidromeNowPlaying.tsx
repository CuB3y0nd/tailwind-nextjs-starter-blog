'use client'

import React, { useState, useEffect } from 'react';
import siteMetadata from '@/data/siteMetadata'

interface NavidromeNowPlayingData {
  id: string;
  title?: string;
  artist?: string;
  coverArt?: string;
}

const API_BASE_URL = 'https://music.cubeyond.net/rest/';
const GET_NOW_PLAYING_URL = `${API_BASE_URL}getNowPlaying.view`;
const GET_SHARES_URL = `${API_BASE_URL}getShares`;
const CREATE_SHARE_URL = `${API_BASE_URL}createShare.view`;
const GET_COVER_ART_URL = `${API_BASE_URL}getCoverArt`;

const NAVIDROME_API_PARAMS = new URLSearchParams({
  u: siteMetadata.navidrome.user,
  t: siteMetadata.navidrome.token,
  s: siteMetadata.navidrome.salt,
  f: siteMetadata.navidrome.format,
  v: siteMetadata.navidrome.version,
  c: siteMetadata.navidrome.client,
});

const NavidromeNowPlaying: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<NavidromeNowPlayingData | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nowPlayingResponse, sharesResponse] = await Promise.all([
          fetch(`${GET_NOW_PLAYING_URL}?${NAVIDROME_API_PARAMS}`),
          fetch(`${GET_SHARES_URL}?${NAVIDROME_API_PARAMS}`)
        ]);

        if (!nowPlayingResponse.ok || !sharesResponse.ok) {
          throw new Error(`Response not OK - Now Playing: ${nowPlayingResponse.status}, Shares: ${sharesResponse.status}`);
        }

        const [nowPlayingData, sharesData] = await Promise.all([
          nowPlayingResponse.json(),
          sharesResponse.json()
        ]);

        let nowPlayingInfo: NavidromeNowPlayingData | null = null;
        if (nowPlayingData?.['subsonic-response']?.nowPlaying?.entry) {
          const nowPlayingEntry = nowPlayingData['subsonic-response']['nowPlaying']['entry'][0];
          nowPlayingInfo = {
            id: nowPlayingEntry['id'] || '',
            title: nowPlayingEntry['title'] || '',
            artist: nowPlayingEntry['artist'] || '',
            coverArt: nowPlayingEntry['coverArt'] || '',
          };
        }

        setNowPlaying(nowPlayingInfo);

        let shareUrl = null;
        const shares = sharesData?.['subsonic-response']?.shares?.share;
        if (shares && shares.length > 0) {
          const existingShare = shares.find((share: any) => share['entry'][0]['id'] === nowPlayingInfo?.id);
          shareUrl = existingShare?.['url'];
        }

        if (!shareUrl && nowPlayingInfo) {
          const expires = Date.now() + 1 * 24 * 60 * 60 * 1000;
          const createShareResponse = await fetch(`${CREATE_SHARE_URL}?id=${nowPlayingInfo.id}&expires=${expires}&${NAVIDROME_API_PARAMS}`);
          const shareData = await createShareResponse.json();
          shareUrl = shareData?.['subsonic-response']?.shares?.share[0]?.['url'];
        }

        setShareLink(shareUrl);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('Now Playing:', nowPlaying);
    console.log('Share Link:', shareLink);
  }, [nowPlaying, shareLink]);

  return (
    <div className="w-full p-4 text-center sm:p-8">
      <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
        {isLoading ? (
          <div className="w-auto text-text dark:text-text-dark inline-flex items-center justify-center px-4 py-2.5 rounded-md border-2 border-solid bg-transparent bg-opacity-20 dark:bg-opacity-20 transition duration-500 hover:scale-105 hover:rounded-md border-gray-300 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:bg-surface0 dark:hover:bg-surface0-dark">
            <p>Loading currenty playing song...</p>
          </div>
        ) : nowPlaying ? (
          <a className="w-auto text-text dark:text-text-dark inline-flex items-center justify-center px-4 py-2.5 rounded-md border-2 border-solid bg-transparent bg-opacity-20 dark:bg-opacity-20 transition duration-500 hover:scale-105 hover:rounded-md border-gray-300 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:bg-surface0 dark:hover:bg-surface0-dark" target="_blank" href={shareLink || '#'}>
            <img className="mr-3" alt="Music Cover" width="40" height="40" decoding="async" data-nimg="1" style={{ color: `transparent` }} src={`${GET_COVER_ART_URL}?id=${nowPlaying?.coverArt}&${NAVIDROME_API_PARAMS}`} />
            <div className="text-left font-bold">
              <div className="mb-1">
                <p>Title: {nowPlaying?.title}</p>
              </div>
              <div className="-mt-1">
                <p>Artist: {nowPlaying?.artist}</p>
              </div>
            </div>
          </a>
        ) : (
          <div className="w-auto text-text dark:text-text-dark inline-flex items-center justify-center px-4 py-2.5 rounded-md border-2 border-solid bg-transparent bg-opacity-20 dark:bg-opacity-20 transition duration-500 hover:scale-105 hover:rounded-md border-gray-300 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:bg-surface0 dark:hover:bg-surface0-dark">
            <p>Nothing playing...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavidromeNowPlaying;

