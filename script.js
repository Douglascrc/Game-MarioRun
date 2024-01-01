const mario = document.querySelector('.mario');
const tubo = document.querySelector('.tubo');
const placar = document.querySelector('.placar');
const scoreElemento = document.getElementById('score');
const recordeElemento = document.getElementById('recorde'); 

const jump = () => {
    mario.classList.add('jump');
    
    setTimeout(()=> {
        mario.classList.remove('jump');
    },500);
}

const loop = setInterval(()=> {
  
  const tuboPosition = tubo.offsetLeft;
  
  
  const marioPosition= +window.getComputedStyle(mario).bottom.replace('px','');
  
  if(tuboPosition <= 120  && tuboPosition > 0  && marioPosition <=80 ) {
    tubo.style.animation = 'none';
    tubo.style.left = `${tuboPosition}px`;
    
    
    mario.style.animation= 'none';
    mario.style.bottom= `${marioPosition}px`; 
    
    mario.src='Imgs/game-over.png'; 
    mario.style.width= '70px'; 
    mario.style.marginLeft= '50px';

    clearInterval(loop);
  }
  
},10); 

document.addEventListener('keydown', jump);

let score = 0;
let recorde = localStorage.getItem('recorde') || 0; 

const atualizarPlacar = () => {
  scoreElemento.textContent = score;
  recordeElemento.textContent = recorde; // Atualiza o elemento do recorde na tela
};

const incrementarPontuacao = () => {
  score++;
  if (score > recorde) {
    recorde = score;
    localStorage.setItem('recorde', recorde);
  }
  atualizarPlacar();
};


setInterval(() => {
  const marioPositionX = mario.getBoundingClientRect().left;

  if (marioPositionX % 200 === 0) {
    incrementarPontuacao();
  }

}, 100);
