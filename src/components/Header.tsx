import { Search, Bell, User, Upload } from 'lucide-react';

interface HeaderProps {
  username?: string;
}

const Header = ({ username = "Guest" }: HeaderProps) => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-dark-900/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search for artists, songs, albums"
            className="w-full bg-dark-800 border border-dark-700 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-8">
        <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-full transition-colors">
          <Upload size={18} />
          Upload
        </button>
        
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-dark-900"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-dark-700">
          <div className="w-9 h-9 bg-dark-700 rounded-full flex items-center justify-center text-gray-300">
            <User size={20} />
          </div>
          <span className="hidden lg:block text-sm font-medium text-white">{username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
