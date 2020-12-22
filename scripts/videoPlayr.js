export const videoPlayerInit = () => {
    console.log('video');
    // создаем переменные константы
const videoPlayer = document.querySelector('.video-player');
const videoButtonPlay = document.querySelector('.video-button__play');
const videoButtonStop = document.querySelector('.video-button__stop'); 
const videoProgress = document.querySelector('.video-progress'); 
const videoTimePassed = document.querySelector('.video-time__passed');
const videoTimeTotal = document.querySelector('.video-time__total'); 

// функции

// функция смены значака кнопки на play и pause
const toggleIcon = () => {
    if(videoPlayer.paused){
        videoButtonPlay.classList.remove('fa-pause');
        videoButtonPlay.classList.add('fa-play');
    } else {
        videoButtonPlay.classList.add('fa-pause');
        videoButtonPlay.classList.remove('fa-play');
    }
};

// Функция запуска и паузы видео
const togglePlay = () => {
    if(videoPlayer.paused){
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
};

// Функция остановки видео 
const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
};

// функция добовления 0 к однозначным числам
const addZero = n => n < 10 ? '0'+n : n;




// Обработчики событий

videoPlayer.addEventListener('click', togglePlay);
videoButtonPlay.addEventListener('click',togglePlay);

videoPlayer.addEventListener('play',toggleIcon);
videoPlayer.addEventListener('pause',toggleIcon);

videoButtonStop.addEventListener('click', stopPlay);


videoPlayer.addEventListener('timeupdate', () => {

    const currentTime = videoPlayer.currentTime;//время которое прошло с начала видео 
    const duration = videoPlayer.duration;//время всего видео 

    videoProgress.value = (currentTime / 60) * 100;//прогресс видео 


    let minutePassed = Math.floor(currentTime / 60);//округление времени сколько прошло времени с начала видео (минуты)
    let secondsPassed = Math.floor(currentTime % 60);//остаток от деления (секунды)
    
    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal= Math.floor(duration % 60);

    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;//вывод времени на плеер (начало)
    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;//вывод времени на плеер(конец)
});
//событие смены прогресса 
videoProgress.addEventListener('change',() => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;//значение прогресса

    videoPlayer.currentTime = (value * duration) / 100;//установка прогресса
});


}