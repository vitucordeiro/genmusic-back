export interface MusicItem {
    id: string;
    title: string;
    artist: string;
    type: string;
    externalUrls: {
      spotify?: string;
      youtube?: string;
      appleMusic?: string;
    };
    duration: number; // in seconds
    releaseDate?: Date;
  }