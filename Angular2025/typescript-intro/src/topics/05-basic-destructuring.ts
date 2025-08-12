interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details
}

interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: 'Isolation Years',
  details: {
    author: 'Opeth',
    year: 2005
  }
}

const { song: song1, songDuration: duration1, details: { author: author1} } = audioPlayer;

console.log('Song: ', song1);
console.log('Duration: ', duration1);
console.log('Author: ', author1);

const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];

// default to 'Not found' if not present
const [, , p3 = 'Not found'] = dbz;

console.log('Personaje 3: ', p3);

export {};