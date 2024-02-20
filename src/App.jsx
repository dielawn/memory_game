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

  function checkHighScore(newScore) {
    if (newScore > highScore) {
      setHighScore(newScore)
    }
  }


  function newGame() {
    setIsGameOver(false)
    setScore(0)
    setMessage('Click each Pokemon only once!')
    setClicked([])
    setGameTiles(8)
    setLevel(1)
    setIsLevelComplete(false)
  }


  function handleLevel() {
    console.log(`level: ${level} gameTiles: ${gameTiles}`)
    setLevel((prevLevel) => {
      const newLevel = prevLevel + 1
      return newLevel
    })
    setGameTiles((prevLength ) => {
      console.log(prevLength)
    const newLength = prevLength * 2
    console.log(newLength)
      return newLength
    })
    setIsLevelComplete(false)
    setClicked([])
    
    console.log(`level: ${level} gameTiles: ${gameTiles}`)
  }
  useEffect(() => {
    setOrder([...Array(gameTiles).keys()].map(i => i + 1))
    console.log(`Updated order based on new gameTiles: ${gameTiles}`);
  }, [gameTiles])

  function checkWin() {
    if (score === gameTiles - 1) {
      setMessage(`You Beat ${level}!`)
      setIsLevelComplete(true)
      if (level >= 5) {
        setMessage('You Win!')
        setIsGameOver(true)
        return
      }
     
      return
    } 
  }

  function checkLoss(index, id) {   
    if (clicked[index] === id) {
      setMessage('Gaem Over')
      setIsGameOver(true)
      return
    }
    return
  }



  function handleScore(){
    if (!isGameOver) {
      setScore((prevScore) => {
        const newScore = prevScore + 1
        checkHighScore(newScore)
        return newScore        
      })
    }
  }

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

  // useEffect to shuffle before initial load
  useEffect(() => {
    shuffleOrder()
    console.log(`Effect running: level = ${level}, gameTiles = ${gameTiles} order = ${order.length}`)
  }, [level, gameTiles])

  return (
   <div>
     <div className='flex'>
     <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
      <p>Level: {level}</p>
     </div>
    
     <div className={`cardsDiv lvl${level}`}>
      {order.map((num) => (
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
        />    
      ))}
    </div>
      {message !== '' && <p>{message}</p>}
      {isGameOver && <button onClick={() => newGame()}>New Game</button>}
      {isLevelComplete && !isGameOver && <button onClick={() =>  handleLevel()}>Next Level</button>}
   </div>
  )
}

export default App;
