import "./Modals.css"
import { useEffect, useState } from "react"
export const GameDetails = ({ setGameDetails, gameId }) => {

    const [selectedGame, setSelectedGame] = useState({})
    useEffect(
        () => {
            fetch(`http://localhost:8088/games/${gameId}`)
                .then(res => res.json())
                .then((game) => {
                    setSelectedGame(game)
                })
        },
        []
    )
    return (<><div className="modal--background"></div>
        <div className="modal--body--game">
            <img src={selectedGame.image} alt="game box" className="game--details--image"/>
            <h2 className="modal--header">{selectedGame.name}</h2>
            <p>For {selectedGame.minPlayers} - {selectedGame.maxPlayers} players. Weight: {selectedGame.weight}</p>
            <p>{selectedGame.description}</p>
            <div className="modal--buttons">
                <button onClick={() => setGameDetails(false)}>Dismiss</button>
            </div>
        </div>
    </>
    )


}