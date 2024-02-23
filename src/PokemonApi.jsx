import { useState, useEffect } from "react";

export function GottaFetchEmAll({id, clicked, setClicked, shuffleOrder, handleScore, checkLoss, checkWin, isGameOver, score, order, remaining }) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const url =`https://pokeapi.co/api/v2/pokemon/`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}${id}`)
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`)
                }
                const result = await response.json()
                setData(result)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchData()
        return () => {
        }
    }, [clicked, setClicked, id, score, isGameOver, order])

    if(error) return <p>Error: {error}</p>
    if(!data) return <p>Loading...</p>

    function handleClick() {
        setClicked((prevIds) => {
           return [...prevIds, id]
        })
        playRound()
    }

    function playRound() {
        //compare checked to id
        for (let i = 0; i < clicked.length; i++) {
            checkLoss(i, id)            
        }
        //if game is not lost increase score
        handleScore()
        checkWin()
        if (isGameOver) {
            setData(remaining)
            return 
        }
        shuffleOrder()
    }

    return (
        <div>
            
              {isGameOver ?
                    
                <div key={data.name}>
                    <p>{data.name}</p>
                    <img src={data.sprites.front_default} alt={`${data.name} character image`} />
                </div>
             :
                <button className="pokeCard" onClick={() => handleClick()}>
                    <p>{data.name}</p>
                    <img src={data.sprites.front_default} alt={`${data.name} character image`} />
                </button>}
                
            </div>
    )
}
