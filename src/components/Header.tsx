import { Search, Bell, User, Upload, ListMusic } from 'lucide-react';

interface HeaderProps {
  username?: string;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onQueueClick?: () => void;
  queueCount?: number;
}

const Header = ({ 
  username = "Guest", 
  searchQuery = '', 
  setSearchQuery,
  onLoginClick,
  onSignupClick,
  onQueueClick,
  queueCount = 0
}: HeaderProps) => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-dark-900/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search for artists, songs, albums"
            value={searchQuery}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            className="w-full bg-dark-800 border border-dark-700 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <button 
          onClick={onQueueClick}
          className="relative p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ListMusic size={22} />
          {queueCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
              {queueCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => alert('Upload feature coming soon!')}
          className="hidden md:flex items-center gap-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-full transition-colors"
        >
          <Upload size={18} />
          Upload
        </button>
        
        <button 
          onClick={() => alert('No new notifications')}
          className="p-2 text-gray-400 hover:text-white transition-colors relative"
        >
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-dark-900"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-dark-700">
          <div 
            onClick={onLoginClick}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 bg-dark-700 rounded-full flex items-center justify-center text-gray-300">
              <User size={20} />
            </div>
            <div className="hidden lg:block">
              <span className="text-sm font-medium text-white">{username}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); onSignupClick?.(); }}
                className="block text-xs text-orange-500 hover:text-orange-400"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
  
