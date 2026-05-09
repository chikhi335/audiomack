
import { useState, useRef, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import SongCard from './components/SongCard'
import MusicPlayer from './components/MusicPlayer'
import AuthModal from './components/AuthModal'
import QueuePanel from './components/QueuePanel'
import { trendingSongs, recentlyPlayed, newReleases, type Song } from './mockData'
import { ChevronRight, Heart } from 'lucide-react'

function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>(trendingSongs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [searchQuery, setSearchQuery] = useState('')
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [showQueue, setShowQueue] = useState(false)
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set())
  const [queue, setQueue] = useState<Song[]>([])
  const [currentView, setCurrentView] = useState<'home' | 'browse' | 'library'>('home')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const allSongs = [...trendingSongs, ...recentlyPlayed, ...newReleases]

  const filteredSongs = (songs: Song[]) => {
    return songs.filter(song => {
      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = selectedGenre === 'All' || song.genre === selectedGenre
      return matchesSearch && matchesGenre
    })
  }

  const toggleLike = (songId: string) => {
    setLikedSongs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(songId)) {
        newSet.delete(songId)
      } else {
        newSet.add(songId)
      }
      return newSet
    })
  }

  const addToQueue = (song: Song) => {
    setQueue(prev => [...prev, song])
    alert(`Added "${song.title}" to queue!`)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Playback failed:", err)
            setIsPlaying(false)
          })
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong, volume])

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
      if (!queue.find(s => s.id === song.id)) {
        setQueue(prev => [...prev, song])
      }
    }
  }

  const handleNext = () => {
    if (!currentSong) return
    const currentList = allSongs
    const currentIndex = currentList.findIndex(s => s.id === currentSong.id)
    
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * currentList.length)
      setCurrentSong(currentList[randomIndex])
    } else if (queue.length > 0) {
      const nextInQueue = queue.find(s => s.id !== currentSong.id)
      if (nextInQueue) setCurrentSong(nextInQueue)
    } else {
      const nextIndex = (currentIndex + 1) % currentList.length
      setCurrentSong(currentList[nextIndex])
    }
    setIsPlaying(true)
  }

  const handlePrevious = () => {
    if (!currentSong) return
    const currentList = allSongs
    const currentIndex = currentList.findIndex(s => s.id === currentSong.id)
    const prevIndex = currentIndex === 0 ? currentList.length - 1 : currentIndex - 1
    setCurrentSong(currentList[prevIndex])
    setIsPlaying(true)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleEnded = () => {
    if (isRepeat && currentSong) {
      audioRef.current?.play()
    } else {
      handleNext()
    }
  }

  const removeFromQueue = (songId: string) => {
    setQueue(prev => prev.filter(s => s.id !== songId))
  }

  return (
    <div className="flex bg-dark-900 min-h-screen text-white">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        likedCount={likedSongs.size}
        playlistCount={0}
      />
      
      <main className="flex-1 ml-60 pb-32">
        <Header 
          username="Kevin" 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLoginClick={() => { setAuthMode('login'); setShowAuth(true) }}
          onSignupClick={() => { setAuthMode('signup'); setShowAuth(true) }}
          onQueueClick={() => setShowQueue(true)}
          queueCount={queue.length}
        />
        
        <div className="px-8 pt-6">
          {/* Hero Section */}
          {!searchQuery && currentView === 'home' && (
            <section className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-orange-400 p-10 h-80 flex flex-col justify-end">
              <div className="relative z-10 max-w-lg">
                <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                  Discover the best <br />new music
                </h1>
                <p className="text-orange-100 font-medium text-lg mb-6 max-w-md">
                  Stream the latest trending songs and albums from your favorite artists.
                </p>
                <button 
                  onClick={() => setCurrentView('browse')}
                  className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition-colors shadow-lg"
                >
                  Explore Now
                </button>
              </div>
              <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-100px] left-[50%] w-64 h-64 bg-black/5 rounded-full blur-2xl"></div>
            </section>
          )}

          {/* Genre Filter */}
          {currentView === 'browse' && !searchQuery && (
            <section className="mb-8">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {['All', 'Hip Hop', 'Pop', 'R&B', 'Country', 'Latin', 'Afrobeats'].map(genre => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedGenre === genre 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-dark-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Trending Section */}
          {(currentView === 'home' || currentView === 'browse') && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {searchQuery ? 'Search Results' : currentView === 'browse' ? 'Browse All' : 'Trending Songs'}
                </h2>
                {!searchQuery && (
                  <button 
                    onClick={() => setCurrentView('browse')}
                    className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-1 text-sm"
                  >
                    View All <ChevronRight size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {filteredSongs(trendingSongs).map((song) => (
                  <SongCard 
                    key={song.id} 
                    song={song} 
                    isActive={currentSong?.id === song.id}
                    isLiked={likedSongs.has(song.id)}
                    onPlay={handlePlaySong}
                    onLike={() => toggleLike(song.id)}
                    onAddToQueue={() => addToQueue(song)}
                  />
                ))}
              </div>
              {filteredSongs(trendingSongs).length === 0 && (
                <p className="text-gray-400 text-center py-8">No songs found</p>
              )}
            </section>
          )}

          {/* New Releases */}
          {currentView === 'home' && !searchQuery && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">New Releases</h2>
                <button 
                  onClick={() => alert('View all coming soon!')}
                  className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-1 text-sm"
                >
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {newReleases.map((song) => (
                  <SongCard 
                    key={song.id} 
                    song={song} 
                    isActive={currentSong?.id === song.id}
                    isLiked={likedSongs.has(song.id)}
                    onPlay={handlePlaySong}
                    onLike={() => toggleLike(song.id)}
                    onAddToQueue={() => addToQueue(song)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Recently Played */}
          {currentView === 'home' && !searchQuery && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recently Played</h2>
                <button 
                  onClick={() => alert('View all coming soon!')}
                  className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-1 text-sm"
                >
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {recentlyPlayed.map((song) => (
                  <SongCard 
                    key={song.id} 
                    song={song} 
                    isActive={currentSong?.id === song.id}
                    isLiked={likedSongs.has(song.id)}
                    onPlay={handlePlaySong}
                    onLike={() => toggleLike(song.id)}
                    onAddToQueue={() => addToQueue(song)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Library View */}
          {currentView === 'library' && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Your Library</h2>
              {likedSongs.size === 0 ? (
                <div className="text-center py-20">
                  <Heart size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400">No liked songs yet. Start liking songs!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {allSongs.filter(s => likedSongs.has(s.id)).map(song => (
                    <SongCard 
                      key={song.id}
                      song={song}
                      isActive={currentSong?.id === song.id}
                      isLiked={true}
                      onPlay={handlePlaySong}
                      onLike={() => toggleLike(song.id)}
                      onAddToQueue={() => addToQueue(song)}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {currentSong && (
        <audio 
          ref={audioRef}
          src={currentSong.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
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
        onNext={handleNext}
        onPrevious={handlePrevious}
        isShuffle={isShuffle}
        onShuffleToggle={() => setIsShuffle(!isShuffle)}
        isRepeat={isRepeat}
        onRepeatToggle={() => setIsRepeat(!isRepeat)}
        onQueueClick={() => setShowQueue(true)}
      />

      {showAuth && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuth(false)}
          onSwitchMode={() => setAuthMode(prev => prev === 'login' ? 'signup' : 'login')}
        />
      )}

      {showQueue && (
        <QueuePanel 
          queue={queue}
          currentSong={currentSong}
          onClose={() => setShowQueue(false)}
          onPlay={handlePlaySong}
          onRemove={removeFromQueue}
        />
      )}
    </div>
  )
}

export default App
