'use client'

import { useState,useEffect } from "react"




export default function Home() {
    const [boxHistory, setBoxHistory] = useState(Array(9).fill(""))
    const [xOrY, setXOrY] = useState("X")
    const [startGame, setStartGame] = useState(true)
    const [playGame, setPlayingGame] = useState(true)
    const [congratsMessage, setcongratsMessage] = useState("")
    const allX = Array(3).fill("X")
    const allO = Array(3).fill("O")
    useEffect(() => {
        
        const firstThreeX = boxHistory.filter((value, idx) => (idx < 3))
        const secondThreeX = boxHistory.filter((value, idx) => (idx >= 3 && idx <6))
        const thirdThreeX = boxHistory.filter((value, idx) => (idx >= 6 && idx <9))
        const firstThreeY = boxHistory.filter((value, idx) => (idx >= 0 && idx <9 && idx % 3 === 0))
        const secondThreeY = [boxHistory[1], boxHistory[4], boxHistory[7]]
        const thirdThreeY = [boxHistory[2], boxHistory[5], boxHistory[8]]
        const firstDiagonalThree = boxHistory.filter((value, idx) => (idx >= 0 && idx <9 && idx % 4 === 0))
        const secondDiagonalThree = boxHistory.filter((value, idx) => (idx > 0 && idx <8 && idx % 2 === 0 ))

        if (
            (JSON.stringify(firstThreeX) === JSON.stringify(allX) || JSON.stringify(firstThreeX) === JSON.stringify(allO)) ||
            (JSON.stringify(secondThreeX) === JSON.stringify(allX) || JSON.stringify(secondThreeX) === JSON.stringify(allO)) ||
            (JSON.stringify(thirdThreeX) === JSON.stringify(allX) || JSON.stringify(thirdThreeX) === JSON.stringify(allO)) ||
            (JSON.stringify(firstThreeY) === JSON.stringify(allX) || JSON.stringify(firstThreeY) === JSON.stringify(allO)) ||
            (JSON.stringify(secondThreeY) === JSON.stringify(allX) || JSON.stringify(secondThreeY) === JSON.stringify(allO)) ||
            (JSON.stringify(thirdThreeY) === JSON.stringify(allX) || JSON.stringify(thirdThreeY) === JSON.stringify(allO)) ||
            (JSON.stringify(firstDiagonalThree) === JSON.stringify(allX) || JSON.stringify(firstDiagonalThree) === JSON.stringify(allO))||
            (JSON.stringify(secondDiagonalThree) === JSON.stringify(allX) || JSON.stringify(secondDiagonalThree) === JSON.stringify(allO)) 

        ) {
            setPlayingGame(false)
            if (xOrY === "X") {
                setcongratsMessage("O's has have one the game")
            } else if (xOrY === "O") {
                setcongratsMessage("X's has have one the game")
            }

            
        }
    }, [boxHistory])
    function changeStatus(replaceValueidx) {
        function canPlace(changedXorO) {
            if (newBoxHistory[replaceValueidx] === "") {
                newBoxHistory[replaceValueidx] = xOrY 
                setBoxHistory(newBoxHistory)
                setXOrY(changedXorO)
            }
        }

        const newBoxHistory = [...boxHistory]
        if (playGame) {
            if (startGame) {
                setStartGame(false)
                canPlace("O")
            } else if( xOrY === "X") {
                canPlace("O")
            } else if(xOrY === "O") {
                canPlace("X")
                
            }
        }

    }

    function startNewGame() {
        setBoxHistory(Array(9).fill(""))
        setXOrY("X")
        setStartGame(true)
        setPlayingGame(true)
        setcongratsMessage("")
    }

    return (
        <div>
            <h1>Next Player: {xOrY}</h1>
            <div className=" w-80 grid grid-cols-3 grid-rows-3">
                {boxHistory.map((item, idx) => {
                    return(
                        <button className="p-12 border-black border-4" onClick={() => changeStatus(idx)}>{item}</button>
                    ) 
                })}
            </div>
            <div>
                <h1>{congratsMessage}</h1>
                <button className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-700" onClick={startNewGame} >Play Again</button>
                
            </div>
        </div>
    )
}





