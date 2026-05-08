
 import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, VolumeX, Maximize2, ListMusic } from 'lucide-react';
import { type Song } from '../mockData';
import { useState, useEffect } from 'react';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isShuffle: boolean;
  onShuffleToggle: () => void;
  isRepeat: boolean;
  onRepeatToggle: () => void;
  onQueueClick?: () => void;
}

const MusicPlayer = ({ 
  currentSong, 
  isPlaying, 
  onTogglePlay, 
  currentTime, 
  duration, 
  onSeek,
  volume,
  onVolumeChange,
  onNext,
  onPrevious,
  isShuffle,
  onShuffleToggle,
  isRepeat,
  onRepeatToggle,
  onQueueClick
}: MusicPlayerProps) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&q=80";

  useEffect(() => {
    setImgError(false);
  }, [currentSong?.id]);

  if (!currentSong) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    onSeek(percentage * duration);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    onVolumeChange(percentage);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-dark-900/90 backdrop-blur-xl border-t border-dark-700 px-6 flex items-center justify-between z-50">
      <div className="flex items-center gap-4 w-1/3">
        <img 
          src={imgError ? fallbackImage : currentSong.cover} 
          alt={currentSong.title} 
          onError={() => setImgError(true)}
          className="w-14 h-14 rounded-md object-cover border border-dark-700"
        />
        <div className="overflow-hidden">
          <h4 className="text-white font-bold truncate text-sm">{currentSong.title}</h4>
          <p className="text-gray-400 text-xs truncate font-medium">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3 max-w-2xl">
        <div className="flex items-center gap-6 mb-2">
          <button 
            onClick={onShuffleToggle}
            className={`transition-colors ${isShuffle ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Shuffle size={18} />
          </button>
          <button 
            onClick={onPrevious}
            className="text-white hover:text-orange-500 transition-colors"
          >
            <SkipBack size={22} fill="currentColor" />
          </button>
          <button 
            onClick={onTogglePlay}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
          >
            {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" size={20} className="ml-1" />}
          </button>
          <button 
            onClick={onNext}
            className="text-white hover:text-orange-500 transition-colors"
          >
            <SkipForward size={22} fill="currentColor" />
          </button>
          <button 
            onClick={onRepeatToggle}
            className={`transition-colors ${isRepeat ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Repeat size={18} />
          </button>
        </div>
        
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] text-gray-500 font-medium tabular-nums">{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-dark-700 rounded-full relative group cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-orange-500 rounded-full group-hover:bg-orange-400 transition-colors"
              style={{ width: `${progress}%` }}
            ></div>
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progress}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-gray-500 font-medium tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 w-1/3">
        <button
          onClick={onQueueClick}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ListMusic size={18} />
        </button>
        
        <div className="flex items-center gap-2 w-32 group">
          <button onClick={() => onVolumeChange(volume === 0 ? 0.7 : 0)}>
            {volume === 0 ? (
              <VolumeX size={18} className="text-gray-400 hover:text-white" />
            ) : (
              <Volume2 size={18} className="text-gray-400 hover:text-white" />
            )}
          </button>
          <div 
            className="flex-1 h-1 bg-dark-700 rounded-full cursor-pointer relative"
            onClick={handleVolumeClick}
          >
            <div 
              className="h-full bg-white rounded-full"
              style={{ width: `${volume * 100}%` }}
            ></div>
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${volume * 100}%` }}
            ></div>
          </div>
        </div>
        <button 
          onClick={() => alert('Fullscreen coming soon!')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
    
