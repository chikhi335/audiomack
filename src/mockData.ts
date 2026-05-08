export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  url: string;
}

export const trendingSongs: Song[] = [
  {
    id: '1',
    title: 'Rich Baby Daddy',
    artist: 'Drake ft. Sexyy Red & SZA',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop',
    duration: '0:30',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Lovin On Me',
    artist: 'Jack Harlow',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    duration: '0:30',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop',
    duration: '0:30',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Paint The Town Red',
    artist: 'Doja Cat',
    cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=300&h=300&fit=crop',
    duration: '0:30',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: '5',
    title: 'Snooze',
    artist: 'SZA',
    cover: 'https://images.unsplash.com/photo-1514525253361-bee8a487409e?w=300&h=300&fit=crop',
    duration: '0:30',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: '6',
    title: 'Water',
    artist: 'Tyla',
    cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop',
    duration: '0:30',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
];

export const recentlyPlayed: Song[] = [
  {
    id: '7',
    title: 'IDGAF',
    artist: 'Drake ft. Yeat',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    duration: '0:30',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: '8',
    title: 'Agora Hills',
    artist: 'Doja Cat',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop',
    duration: '0:30',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
  {
    id: '9',
    title: 'Monaco',
    artist: 'Bad Bunny',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    duration: '0:30',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  },
];
