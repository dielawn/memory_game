import { useState, useEffect } from "react";

export function GottaFetchEmAll({id}) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`)

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
    }, [])

    if(error) return <p>Error: {error}</p>
    if(!data) return <p>Loading...</p>
    return (
        <button className="pokeCard">
            <p>{data.name}</p>
            <img src={data.sprites.front_default} alt={`${data.name} character image`} />
        </button>
    )
}
