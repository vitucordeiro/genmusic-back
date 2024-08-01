export class playlistHandler{
    protected playlist:Record<string,string>;

    constructor(playlist: Record<string,string>){
        this.playlist = playlist;
    }
    removeMusic(artist:string, song:string): boolean{
        for(const [currentArtist, currentSong] of Object.entries(this.playlist)){
            if(currentArtist === artist && currentSong === song) delete this.playlist[currentArtist]
        }
        return false;
    }

}