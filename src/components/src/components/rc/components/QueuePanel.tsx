import { X, Play, Trash2 } from 'lucide-react';
import { type Song } from '../mockData';

interface QueuePanelProps {
  queue: Song[];
  currentSong: Song | null;
  onClose: () => void;
  onPlay: (song: Song) => void;
  onRemove: (songId: string) => void;
}

const QueuePanel = ({ queue, currentSong, onClose, onPlay, onRemove }: QueuePanelProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-end">
      <div className="w-96 bg-dark-900 h-full border-l border-dark-700 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <h2 className="text-xl font-bold text-white">Queue</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {queue.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Your queue is empty</p>
              <p className="text-gray-500 text-sm mt-2">Add songs to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {queue.map((song, index) => (
                <div 
                  key={`${song.id}-${index}`}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    currentSong?.id === song.id 
                      ? 'bg-orange-500/20 border border-orange-500/30' 
                      : 'bg-dark-800/50 hover:bg-dark-800'
                  }`}
                >
                  <img 
                    src={song.cover} 
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium truncate text-sm ${
                      currentSong?.id === song.id ? 'text-orange-500' : 'text-white'
                    }`}>
                      {song.title}
                    </h4>
                    <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onPlay(song)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Play size={16} />
                    </button>
                    <button
                      onClick={() => onRemove(song.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-dark-700">
          <p className="text-gray-500 text-xs text-center">
            {queue.length} {queue.length === 1 ? 'song' : 'songs'} in queue
          </p>
        </div>
      </div>
    </div>
  );
};

export default QueuePanel;
