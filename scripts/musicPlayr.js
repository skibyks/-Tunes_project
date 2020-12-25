import { addZero } from './scriptSupport.js'

export const musicPlayerInit = () => {

    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioButtoPlay = document.querySelector('.audio-button__play');
    const audioVolume = document.querySelector('.audio-volum');
    const audioMute = document.querySelector('.audio-mute');



    const playList = ['hello', 'speed' , 'flow'];

    let treckIndex = 0;

 


    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[treckIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if(isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        };
    };

    const necstTrack = () => {
        if(treckIndex === playList.length -1){
            treckIndex = 0;
        } else {
            treckIndex++;
        };
        loadTrack();
    };

    const prevTrack = () => {
        if(treckIndex !==0){
            treckIndex--;
        } else {
            treckIndex = playList.length - 1;
        };
        loadTrack();
    };

    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if(target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtoPlay.classList.toggle('fa-play');
            audioButtoPlay.classList.toggle('fa-pause');

            if(audioPlayer.paused){
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            };

            const track = playList[treckIndex];
            audioHeader.textContent = track.toUpperCase();
            
        };

        if(target.classList.contains('audio-button__next')) {
            necstTrack();
        };

        if(target.classList.contains('audio-button__prev')) {
            prevTrack();
        };
    });

    audioPlayer.addEventListener('ended', () => {
        necstTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;

        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress +'%';

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondTotal = Math.floor(duration % 60) || '0';


        audioTimePassed.textContent=`${addZero(minutesPassed)}:${addZero(secondPassed)}`;
        audioTimeTotal.textContent=`${addZero(minutesTotal)}:${addZero(secondTotal)}`;

    });

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allwidth = audioProgress.clientWidth;
        const progress = (x / allwidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    })



    musicPlayerInit.stop  = () => {
        audioPlayer.pause();
        if(audioPlayer.paused){
            audio.classList.remove('play');
            audioButtoPlay.classList.add('fa-play');
            audioButtoPlay.classList.remove('fa-pause');
        }
    };


    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
        audioVolume.muted = false;
    });
    
    audioMute.addEventListener('click', () => {
        audioPlayer.muted = !audioPlayer.muted
    })
    
    

    
}