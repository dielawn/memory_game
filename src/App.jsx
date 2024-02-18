import { useState, useEffect } from 'react';
import './App.css';
import { GottaFetchEmAll } from './PokemonApi';

function App() {
  const [data, setData] = useState(null)
  const [order, setOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  function handleOrder() {
    setOrder(prevOrder => {
      const newOrder = [...prevOrder]
      //Fisher-Yates shuffle algorithm 
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
    <div className='cardsDiv'>
      {order.map((num) => (
        <GottaFetchEmAll key={num} id={num} data={data} setData={setData}/>
      ))}
    </div>
  )
}

export default App;
