const grid = document.querySelector(".grid")
const startBtn = document.getElementById('start-btn')
const scoreDisplay = document.getElementById('score')
let squares=[]
let currentSnake = [2,1,0]
let direction = 1
let width = 20
let appleIndex = 0
let score = 0
let timeInterval = 500
let speed = 0.95
let timerId = 0

function createGrid() {
  for(let i=0;i<400;i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
  }
}
createGrid()

currentSnake.forEach(item => squares[item].classList.add(['snake']))

function startGame() {
  currentSnake.forEach(item => squares[item].classList.remove('snake'))
  squares[appleIndex].classList.remove('apple')
  timeInterval = 500
  score = 0
  direction = 1
  currentSnake = [2,1,0]
  generateApples()
  scoreDisplay.textContent = score
  currentSnake.forEach(item => squares[item].classList.add('snake'))
  clearInterval(timerId)
  timerId = setInterval(move,timeInterval)
  gameOver.style.visibility="hidden"
  }

function move() {
  if (
    (currentSnake[0] % 20 === 0 && direction === -1) || // hit-left
    (currentSnake[0] % 20 === 19 && direction === +1) || // hit-right
    (currentSnake[0] - width < 0 && direction === -width) || // hit-top
    (currentSnake[0] + width >=400 && direction === +width) || //hit-bottom
    (squares[currentSnake[0]+direction]).classList.contains('snake')
  ) {
    const gameOver = document.getElementById('gameOver')
    gameOver.style.visibility = "visible"
    return clearInterval(timerId)
  }

  const tail = currentSnake.pop()
  squares[tail].classList.remove('snake')
  currentSnake.unshift(currentSnake[0]+direction)

  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple')
    squares[tail].classList.add('snake')
    currentSnake.push(tail)
    generateApples()
    score++
    scoreDisplay.textContent = score
    clearInterval(timerId)
    timeInterval = timeInterval * speed;
    timerId = setInterval(move,timeInterval)
  }

  squares[currentSnake[0]].classList.add('snake')
}
move()

function generateApples() {
  do{
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple')
}
generateApples()

function control(e) {
  if (e.keyCode === 39) { // right
    direction = 1
  } else if (e.keyCode === 38) { // up
    direction = -width
  } else if (e.keyCode === 37) { // left
    direction = -1
  } else if (e.keyCode === 40) { // down
    direction = +width
  }
}

document.addEventListener("keydown", control)
startBtn.addEventListener('click', startGame)
