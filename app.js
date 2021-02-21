const searchSongs = () => {
    const searchText = document.getElementById('search-filed').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    // load data
    // toggleSpinner(true);
    toggleSpinner();
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('Something Went Wrong!! Please try again later.'));
        // .catch(error => console.log(error));
}
// const searchSongs = async() => {
//     const searchText = document.getElementById('search-filed').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//     // load data
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);
// }
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        // console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onClick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
        // toggleSpinner(false);
    })
}

// const getLyric = (artist, title) => {
//     // console.log(artist, title);
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics))
// }
const getLyric = async (artist, title) => {
    // console.log(artist, title);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError('Sorry! I failed to load lyrics, Please try again letter!');
        // console.log(error);
    };
    
}
const displayLyrics = lyrics => {
    console.log(lyrics);
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerHTML = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggleSpinner = (show) => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    // if(show){
    //     spinner.classList.remove('d-none');
    // } else {
    //     spinner.classList.add('d-none');
    // }
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}