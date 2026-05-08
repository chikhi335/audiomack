import { Play, Heart, Plus, MoreHorizontal } from 'lucide-react';
import { type Song } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SongCardProps {
  song: Song;
  isActive: boolean;
  isLiked?: boolean;
  onPlay: (song: Song) => void;
  onLike?: () => void;
  onAddToQueue?: () => void;
}

const SongCard = ({ song, isActive, isLiked, onPlay, onLike, onAddToQueue }: SongCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&q=80";

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group bg-dark-800/40 hover:bg-dark-800 p-4 rounded-xl transition-all cursor-pointer relative",
        isActive && "bg-dark-800 ring-1 ring-orange-500/30"
      )}
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <img 
          src={imgError ? fallbackImage : song.cover} 
          alt={song.title}
          onError={() => setImgError(true)}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
            isActive && "scale-110"
          )}
          onClick={() => onPlay(song)}
        />
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Play fill="black" size={24} className="ml-1" />
          </div>
        </div>
        
        {/* Like button overlay */}
        <button
          onClick={(e) => { e.stopPropagation(); onLike?.(); }}
          className={cn(
            "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all",
            isLiked ? "bg-orange-500 text-white" : "bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-orange-500"
          )}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div onClick={() => onPlay(song)}>
        <h4 className={cn(
          "font-bold truncate mb-1",
          isActive ? "text-orange-500" : "text-white"
        )}>
          {song.title}
        </h4>
        <p className="text-gray-400 text-sm truncate font-medium mb-2">
          {song.artist}
        </p>
        
        {song.plays && (
          <p className="text-gray-500 text-xs">
            {song.plays >= 1000000 
              ? (song.plays / 1000000).toFixed(1) + 'M' 
              : (song.plays / 1000).toFixed(1) + 'K'} plays
          </p>
        )}
      </div>

      {/* Menu button */}
      <div className="relative mt-2">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-full py-1 text-gray-500 hover:text-white text-xs flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal size={14} /> Options
        </button>
        
        {showMenu && (
          <div className="absolute bottom-full left-0 right-0 mb-1 bg-dark-800 rounded-lg shadow-xl border border-dark-700 overflow-hidden z-20">
            <button
              onClick={() => { onAddToQueue?.(); setShowMenu(false); }}
              className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-dark-700 hover:text-white flex items-center gap-2"
            >
              <Plus size={14} /> Add to Queue
            </button>
            <button
              onClick={() => { onLike?.(); setShowMenu(false); }}
              className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-dark-700 hover:text-white flex items-center gap-2"
            >
              <Heart size={14} /> {isLiked ? 'Unlike' : 'Like'}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SongCard;
