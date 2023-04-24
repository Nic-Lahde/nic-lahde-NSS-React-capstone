import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Users.css"

export const MyGames = () => {
    const [allGames, setAllGames] = useState([])
    const [ownedGames, setOwnedGames] = useState([])
    const [gameAdded, setGameAdded] = useState(false)
    const localKitchenUser = localStorage.getItem("kitchen_user")
    const kitchenUserObject = JSON.parse(localKitchenUser)
    const gameToAdd = {
        gamesId: 0,
        usersId: parseInt(kitchenUserObject.id)
    }
    useEffect(
        () => {
            fetch(`http://localhost:8088/games?_sort=name`)
                .then(res => res.json())
                .then((gamesArray) => {
                    setAllGames(gamesArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/usersGames?usersId=${kitchenUserObject.id}&_expand=games`)
                .then(res => res.json())
                .then(data => {
                    const sortedData = data.sort((a, b) => a.games.name.localeCompare(b.games.name))
                    setOwnedGames(sortedData)
                })

        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/usersGames?usersId=${kitchenUserObject.id}&_expand=games`)
                .then(res => res.json())
                .then(data => {
                    const sortedData = data.sort((a, b) => a.games.name.localeCompare(b.games.name))
                    setOwnedGames(sortedData)
                })

        },
        [gameAdded]
    )
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        if(gameToAdd.gamesId === 0 ){
            window.alert("Please select a game")
        }
        else{
        return fetch(`http://localhost:8088/usersGames`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameToAdd)
        })
            .then(response => response.json())
            .then(() => {
                if (gameAdded) {
                    setGameAdded(false)
                }
                else {
                    setGameAdded(true)
                }

            })}
    }
    const handleDeleteButtonClick = (event) => {
        event.preventDefault()
        fetch(`http://localhost:8088/usersGames/${event.target.value}`, {
            method: "DELETE"
        }).then(() => {
            if (gameAdded) {
                setGameAdded(false)
            }
            else {
                setGameAdded(true)
            }

        })
    }

    return (
        <>
            <fieldset className="collection--form">
                <div className="form-group">
                    <select
                        className="form-control"
                        onChange={(evt) => {
                            gameToAdd.gamesId = parseInt(evt.target.value)
                        }
                        }>  <option defaultValue="0" >Select a game</option>
                        {
                            allGames.map((game) => {
                                return <option key={`game--${game.id}`} value={game.id}>{game.name}</option>
                            }
                            )
                        }

                    </select>
                </div><button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="collection--button">Add to Collection</button>
            </fieldset>
            <Link className="navbar__link create__game" to="/myGames/createGame">Game not listed here? Add it!</Link>
            <h1 className="collection__header">My Collection</h1>
            <div className="collection--list">
            {
                ownedGames.map(game => <section className="collection--list--item"
                    key={`collection--${game.id}`}><img className="collection--item--image" alt="game box" src={game?.games?.image}/>
                    {game?.games?.name} for {game?.games?.minPlayers} - {game?.games?.maxPlayers} players. Weight: {game?.games?.weight}
                    <button onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)} className="delete--button" value={game.id}>Delete</button></section>
                )
            }</div>
        </>
    )
}