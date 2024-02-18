import { useState, useEffect } from "react";

export function DataFetchingComponent() {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}69`)
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
        <div>
            <p>{data.name}</p>
            <img src={data.sprites.front_default} alt="" />
        </div>
    )
}
