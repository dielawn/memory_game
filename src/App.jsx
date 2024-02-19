import { useState, useEffect } from 'react';
import './App.css';
import { GottaFetchEmAll } from './PokemonApi';
import {PokeBtns} from './PokeBtns';

function App() {
  const [isGameOver, setIsGameOver] = useState(false)
  const [order, setOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [clicked, setClicked] = useState([])  
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0) 
  const [message, setMessage] = useState('')

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
    if (score === 11) {
      //game over player wins
      setMessage('You Win!')
      setIsGameOver(true)
      return
    } 
  }

  function checkLoss(index, id) {
   
    if (clicked[index] === id) {
      //game over player loses
      setMessage('You Lose')
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

  function handleOrder() {
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
    handleOrder()
  }, []) // Empty array means this effect runs once on mount



  return (
   <div>
     <div className='cardsDiv'>
      {order.map((num) => (
         <GottaFetchEmAll  
          key={num} 
          id={num} 
          clicked={clicked} 
          setClicked={setClicked} 
          handleOrder={handleOrder}
          setScore={setScore}
          score={score}
          setIsGameOver={setIsGameOver}
          handleScore={handleScore}
          checkHighScore={checkHighScore}
          checkLoss={checkLoss}
          checkWin={checkWin}
          isGameOver={isGameOver}
          score={score}
          newGame={newGame}
        />    
      ))}
    </div>
    {message !== '' && <p>{message}</p>}
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>

   </div>
  )
}

export default App;
