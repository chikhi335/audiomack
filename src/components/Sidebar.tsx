import { Home, Compass, Library, Music2, Clock, ThumbsUp, PlusSquare } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Feed', active: true },
    { icon: Compass, label: 'Discover' },
    { icon: Library, label: 'Library' },
  ];

  const secondaryItems = [
    { icon: Music2, label: 'Playlists' },
    { icon: Clock, label: 'Recently Played' },
    { icon: ThumbsUp, label: 'Favorites' },
  ];

  return (
    <div className="w-60 bg-dark-900 h-screen fixed left-0 top-0 border-r border-dark-700 flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-black">
          A
        </div>
        <span className="text-xl font-bold tracking-tight text-white">AUDIOMACK</span>
      </div>

      <div className="space-y-8">
        <div>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className={`flex items-center gap-4 transition-colors ${
                    item.active ? 'text-orange-500' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <item.icon size={22} />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Collection
          </h3>
          <ul className="space-y-4">
            {secondaryItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors"
                >
                  <item.icon size={22} />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button className="flex items-center gap-4 text-orange-500 font-semibold hover:text-orange-400 transition-colors mt-auto">
          <PlusSquare size={22} />
          <span>Create Playlist</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
