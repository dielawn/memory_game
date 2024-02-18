import { useState } from "react"

const [order, setOrder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])

function handleOrder() {
    setOrder(prevOrder => {
        //creating a copy of the array to prevent direct mutation of state
        const newOrder = [...prevOrder]
        //Fisher-Yates shuffle algorithm 
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            //shuffle
           [order[i], order[j] = order[j], order[i]]
        }
        return newOrder
    })
}