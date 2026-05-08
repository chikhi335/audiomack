import { useState, useRef, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import SongCard from './components/SongCard'
import MusicPlayer from './components/MusicPlayer'
import { trendingSongs, recentlyPlayed, type Song } from './mockData'
import { ChevronRight } from 'lucide-react'

function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>(trendingSongs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Playback failed:", err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const handleSeek = useCallback((time: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(audioRef.current.duration, time))
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in search input
      if (e.target instanceof HTMLInputElement) return

      if (e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      } else if (e.code === 'ArrowRight') {
        handleSeek(currentTime + 5)
      } else if (e.code === 'ArrowLeft') {
        handleSeek(currentTime - 5)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay, handleSeek, currentTime])

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentSong(song)
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  return (
    <div className="flex bg-dark-900 min-h-screen text-white">
      <Sidebar />
      
      <main className="flex-1 ml-60 pb-32">
        <Header username="Kevin" />
        
        <div className="px-8 pt-6">
          {/* Hero Section */}
          <section className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-400 p-10 h-80 flex flex-col justify-end">
            <div className="relative z-10 max-w-lg">
              <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                Discover the best <br />new music
              </h1>
              <p className="text-orange-100 font-medium text-lg mb-6 max-w-md">
                Stream the latest trending songs and albums from your favorite artists.
              </p>
              <button className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition-colors shadow-lg">
                Explore Now
              </button>
            </div>
            {/* Abstract decorative circles */}
            <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-100px] left-[50%] w-64 h-64 bg-black/5 rounded-full blur-2xl"></div>
          </section>

          {/* Trending Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Trending Songs</h2>
              <a href="#" className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-1 text-sm">
                View All <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {trendingSongs.map((song) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  isActive={currentSong?.id === song.id}
                  onPlay={handlePlaySong}
                />
              ))}
            </div>
          </section>

          {/* Recently Played Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recently Played</h2>
              <a href="#" className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-1 text-sm">
                View All <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {recentlyPlayed.map((song) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  isActive={currentSong?.id === song.id}
                  onPlay={handlePlaySong}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {currentSong && (
        <audio 
          ref={audioRef}
          src={currentSong.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      <MusicPlayer 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        onTogglePlay={togglePlay}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={setVolume}
      />
    </div>
  )
}

export default App
