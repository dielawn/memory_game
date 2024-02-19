import { useState, useEffect } from 'react';
import './App.css';
import { GottaFetchEmAll } from './PokemonApi';

function App() {
  const [isGameOver, setIsGameOver] = useState(false)
  const [order, setOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
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
    setMessage('')
    setClicked([])
  }

  function checkWin() {
    if (score === 10) {
      setMessage('You Win!')
      setIsGameOver(true)
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
  }, []) // Empty array means this effect runs once on mount

  return (
   <div>
     <div className='flex'>
     <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
     </div>
    
     <div className='cardsDiv'>
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
        />    
      ))}
    </div>
      {message !== '' && <p>{message}</p>}
      {isGameOver && <button onClick={() => newGame()}>New Game</button>}
   </div>
  )
}

export default App;
