import { Album } from './album.interface';
import { Artist } from './artist.interface';
import { Track } from './track.interface';

export interface Fav {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
