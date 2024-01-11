const mario = document.querySelector('.mario');
const tubo = document.querySelector('.tubo');
const scoreElement = document.getElementById('score');
const recordElement = document.getElementById('recorde');
const gameOver = document.querySelector('.gameover');

const loop = setInterval(() => {
     
    const tuboPosition = tubo.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (tuboPosition <= 120 && tuboPosition > 0 && marioPosition <= 80) {
      tubo.style.animation = 'none';
      tubo.style.left = `${tuboPosition}px`;

      mario.style.animation = 'none';
      mario.style.bottom = `${marioPosition}px`;

      mario.src = 'Imgs/game-over.png';
      mario.style.width = '70px';
      mario.style.marginLeft = '50px';

      gameOver.style.display = 'block';
      clearInterval(loop);
    }
  }, 10);

let score = 0;
let record = localStorage.getItem('recorde') || 0;

setInterval(() => {
  const marioPositionX = mario.getBoundingClientRect().left;

  if (marioPositionX % 200 === 0) {
    incrementarPontuacao(); 
  } 
}, 100);

const atualizarPlacar = () => {
  scoreElement.textContent = score;
  recordElement.textContent = record; 
};

const incrementarPontuacao = () => {
  score++;
  if (score > record) {
    record = score;
    localStorage.setItem('recorde', record);
  }
  atualizarPlacar();
};

// Event listener para reiniciar o jogo quando a tela de Game Over estiver visível
document.addEventListener('keydown', () => {
  if (gameOver.style.display === 'block') {
    location.reload(true);
  } else {
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
});


