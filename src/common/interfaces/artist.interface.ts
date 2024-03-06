export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export type NewArtist = Omit<Artist, 'id'>;
