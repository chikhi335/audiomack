import { Play } from 'lucide-react';
import { type Song } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SongCardProps {
  song: Song;
  isActive: boolean;
  onPlay: (song: Song) => void;
}

const SongCard = ({ song, isActive, onPlay }: SongCardProps) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&q=80";

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group bg-dark-800/40 hover:bg-dark-800 p-4 rounded-xl transition-all cursor-pointer",
        isActive && "bg-dark-800 ring-1 ring-orange-500/30"
      )}
      onClick={() => onPlay(song)}
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
        />
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Play fill="black" size={24} className="ml-1" />
          </div>
        </div>
      </div>
      <h4 className={cn(
        "font-bold truncate mb-1",
        isActive ? "text-orange-500" : "text-white"
      )}>
        {song.title}
      </h4>
      <p className="text-gray-400 text-sm truncate font-medium">
        {song.artist}
      </p>
    </motion.div>
  );
};

export default SongCard;
