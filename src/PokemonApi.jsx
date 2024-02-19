import { useState, useEffect } from "react";

export function GottaFetchEmAll({id, clicked, setClicked, handleOrder, handleScore, newGame, checkLoss, checkWin, isGameOver, score }) {
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
    }, [clicked, setClicked, id, score, isGameOver])

    if(error) return <p>Error: {error}</p>
    if(!data) return <p>Loading...</p>




    function handleClick() {
        setClicked((prevIds) => {
           return [...prevIds, id]
        })
        playRound()
    }



    function playRound() {
        console.log(clicked)
        for (let i = 0; i < clicked.length; i++) {
            checkLoss(i, id)            
        }
        handleScore()
        checkWin()
        if (isGameOver) {
            return <button onClick={() => newGame()}>New Game</button>
        }
        handleOrder()
    }

    return (
        
            <button className="pokeCard" onClick={() => handleClick()}>
                <p>{data.name}</p>
                <img src={data.sprites.front_default} alt={`${data.name} character image`} />
            </button>
        
    )
}
