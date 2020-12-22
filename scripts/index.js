//Импорты с другий js файлов
import { videoPlayerInit } from './videoPlayr.js';
import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayr.js';


//объявление переменных констант
const playrBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

//Функции

// функция убирающая не активные блоки(видео аудио музыка)
const deactivationPlayer = () => {
    playrBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
}

//обработчик события на каждую кнопку вызывает функцию и деалет активным выделенный блок
playrBtn.forEach((btn, i) =>  btn.addEventListener('click',() => {
        temp.style.display = 'none';
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');
    })
);



//вызов экстпортируемых функция
videoPlayerInit();
radioPlayerInit();
musicPlayerInit();