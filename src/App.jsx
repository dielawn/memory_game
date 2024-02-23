import { useState, useEffect } from 'react';
import './App.css';
import { GottaFetchEmAll } from './PokemonApi';

function App() {
  const [gameTiles, setGameTiles] = useState(8)
  const [level, setLevel] = useState(1)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)  
  const [order, setOrder] = useState([...Array(gameTiles).keys()].map(i => i + 1)); 
  const [clicked, setClicked] = useState([])  
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0) 
  const [message, setMessage] = useState('Click each Pokemon only once!')
  const [remaining, setRemaining] = useState([])

  function newGame() {
    setIsGameOver(false)
    setScore(0)
    setMessage('Click each Pokemon only once!')
    setClicked([])
    setGameTiles(8)
    setLevel(1)
    setIsLevelComplete(false)
    console.log(isLevelComplete)
  }

  //shuffle algo
  function shuffleOrder() {
    setOrder(prevOrder => {
      const newOrder = [...prevOrder]     
      for (let i = newOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]]
      }
      return newOrder
    })
  }
  
  //shuffle before initial load
  useEffect(() => {
    shuffleOrder()
    // console.log(`Effect running: level = ${level}, gameTiles = ${gameTiles} order = ${order.length}`)
  }, [level, gameTiles])

  //when level changes number of game tiles doubles 
  useEffect(() => {      
    setGameTiles(() => {
      console.log(`Level updated to ${level}, recalculating gameTiles.`)
      return Math.pow(2, level + 2)
    })
  }, [level])

  //update array length to render additional tiles
  useEffect(() => {
    setOrder([...Array(gameTiles).keys()].map(i => i + 1))   
    // console.log(`Updated order based on new gameTiles: ${gameTiles}`)
  }, [gameTiles])

  //empty clicked array so tiles can be clicked again in new level, 
  useEffect(() => {
      setClicked([])
      setIsLevelComplete(false)
  }, [isLevelComplete])

  function checkWin() {
    if (clicked.length + 1 === gameTiles) {
      setMessage(`You Beat Level: ${level}!`)
      setIsLevelComplete(true)
      setLevel((prevLevel) => {
      const newLevel = prevLevel + 1
      return newLevel
    })
    //final level win score 
    if (score === 247) {
      setMessage('You Win!')
      setIsGameOver(true)
      return
    }
     
      return
    } 
  }

  function displayRemaining() {
    setRemaining(order.filter(item => !clicked.includes(item)));
  }
  
  //if any element in clicked array matches current id tile has been clicked before, game over.
  function checkLoss(index, id) {   
    if (clicked[index] === id) {
      setMessage('Game Over')
     
      setIsGameOver(true)
      return
    }
    return
  }

  function checkHighScore(newScore) {
    if (newScore > highScore) {
      setHighScore(newScore)
    }
  }

  // increase score and check for high score
  function handleScore(){
    if (!isGameOver) {
      setScore((prevScore) => {
        const newScore = prevScore + 1
        checkHighScore(newScore)
        return newScore        
      })
    }
  }

  //displays unclicked pokemon
  useEffect(() => {
    displayRemaining()
  }, [isGameOver])


  return (
   <div>
     <div className='flex'>
     <p> Score: {score} </p>
      <p> High Score: {highScore} </p>
      <p> Level: {level} </p>
     </div>
    
     <div className={`cardsDiv lvl${level}`}>
     {isGameOver ? 
  remaining.map((num) => (
    <GottaFetchEmAll  
      key={num} 
      id={num} 
      clicked={clicked} 
      setClicked={setClicked} 
      shuffleOrder={shuffleOrder}
      setScore={setScore}
      score={score}
      setIsGameOver={setIsGameOver}
      handleScore={handleScore}
      checkHighScore={checkHighScore}
      checkLoss={checkLoss}
      checkWin={checkWin}
      isGameOver={isGameOver}
      newGame={newGame}
      order={order}
      remaining={remaining}
    />
  )) 
: 
  order.map((num) => (
    <GottaFetchEmAll  
      key={num} 
      id={num} 
      clicked={clicked} 
      setClicked={setClicked} 
      shuffleOrder={shuffleOrder}
      setScore={setScore}
      score={score}
      setIsGameOver={setIsGameOver}
      handleScore={handleScore}
      checkHighScore={checkHighScore}
      checkLoss={checkLoss}
      checkWin={checkWin}
      isGameOver={isGameOver}
      newGame={newGame}
      order={order}
      remaining={remaining}
    />
  ))
}

    </div>
      {message !== '' && <p>{message}</p>}
      {isGameOver && 
        <button onClick={() => newGame()}>New Game</button>
        }
      
   </div>
  )
}

export default App;
