const audio = document.querySelector('audio');
const playPauseBTN = document.querySelector('#play-pause');
const nextBTN = document.querySelector('#next');
const prevBTN = document.querySelector('#previous');
const songList = document.querySelector('.song-list');
const title = document.querySelector('#title');
const volSlider = document.querySelector('.slider');

let songArray = [];
let songTitle = '';
let songIndex = 0;
let isPlaying = false;

function loadAudio() {
    audio.src = songArray[songIndex];
    let songListItems = songList.getElementsByTagName('li');
    songTitle = songListItems[songIndex].getAttribute('data-name');
    ;
    title.innerText = songTitle;

    for (i = 0; i < songListItems.length; i++) {
        songListItems[i].classList.remove('active'); // avoiding all classes to be active
    }

    songList.getElementsByTagName('li')[songIndex].classList.add('active');
}

function loadSongs() {
    let songs = songList.getElementsByTagName('li');
    for (i = 0; i < songs.length; i++) {
        songArray.push(songs[i].getAttribute('data-src'));
    }
    loadAudio();
}

loadSongs(); //displays the songs title and loading them

function playAudio() {
    audio.play();
    playPauseBTN.querySelector('i.fas').classList.remove('fa-play'); // changing play to pause
    playPauseBTN.querySelector('i.fas').classList.add('fa-pause');
    isPlaying = true;

}

function pauseAudio() {
    audio.pause();
    playPauseBTN.querySelector('i.fas').classList.remove('fa-pause'); // changing play to pause
    playPauseBTN.querySelector('i.fas').classList.add('fa-play');
    isPlaying = false;

}

function nextSong() {
    songIndex++;
    if (songIndex > songArray.length - 1) {//out of bounds
        songIndex = 0;
    }
    loadAudio();
    playAudio();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) {//out of bounds
        songIndex = songArray.length - 1;
    }
    loadAudio();
    playAudio();
}

//events
playPauseBTN.addEventListener('click', function () {
    if (isPlaying) {
        pauseAudio();
    }
    else {
        playAudio();
    }
}, false);

nextBTN.addEventListener('click', function () {
    nextSong();
}, false);

prevBTN.addEventListener('click', function () {
    previousSong();
}, false);

//clicking on songs title to play
songList.addEventListener('click', function (e) {
    songIndex = e.target.closest('li').getAttribute('data-index');
    loadAudio();
    playAudio();
}, false);

//once song done calls next song
audio.addEventListener('ended', function () {
    nextSong();
});

volSlider.addEventListener('input', function () {
    audio.volume = volSlider.value / 100;
}, false);