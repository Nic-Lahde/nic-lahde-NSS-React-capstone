import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GameDetails } from "../modals/GameDetails"
import { NoGameSelected } from "../modals/NoGameSelected"
import "./Users.css"
/** this component displays the users collection and allows them to add games that are already in the database to their collection or to delete them(from collection not database) */
export const MyGames = () => {
    const [allGames, setAllGames] = useState([])
    const [ownedGames, setOwnedGames] = useState([])
    const [gameDetails, setGameDetails] = useState(false)
    const [selectedGameId, setSelectedGameId] = useState()
    const [noGameSelected, setNoGameSelected] = useState(false)
    const localKitchenUser = localStorage.getItem("kitchen_user")
    const kitchenUserObject = JSON.parse(localKitchenUser)
    const gameToAdd = {
        gamesId: 0,
        usersId: parseInt(kitchenUserObject.id)
    }
    /** gets all the games from the database and sorts them by name */
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
    /** gets all the games that the user owns from the database and sorts them by name */
    const myCollection = () => {
        return fetch(`http://localhost:8088/usersGames?usersId=${kitchenUserObject.id}&_expand=games`)
        .then(res => res.json())
        .then(data => {
            const sortedData = data.sort((a, b) => a.games.name.localeCompare(b.games.name))
            setOwnedGames(sortedData)
        })
    }
    useEffect(
        () => {
           myCollection()
        },
        []
    )
    /** adds the selected game to the user's collection */
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        if(gameToAdd.gamesId === 0 ){
            setNoGameSelected(true)
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
               myCollection()

            })}
    }
    /** deletes the selected game from the user's collection*/
    const handleDeleteButtonClick = (event) => {
        event.preventDefault()
        fetch(`http://localhost:8088/usersGames/${event.target.value}`, {
            method: "DELETE"
        }).then(() => {
           myCollection()

        })
    }
    /**display game details and a larger image of the clicked game image */
    const handleImageClick = (gameId) =>{
        setSelectedGameId(gameId)
        setGameDetails(true)
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
                <h3 className="collection--number">{ownedGames.length} items in collection</h3>
            {
                ownedGames.map(game => <section className="collection--list--item"
                    key={`collection--${game.id}`}><img onClick={()=> handleImageClick(game?.games?.id)} className="collection--item--image" alt="game box" src={game?.games?.image}/>
                    {game?.games?.name} for {game?.games?.minPlayers} - {game?.games?.maxPlayers} players. Weight: {game?.games?.weight}
                    <button onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)} className="delete--button" value={game.id}>Delete</button></section>
                )
            }</div>
            {gameDetails && <GameDetails setGameDetails={setGameDetails} gameId={selectedGameId}/>}
            {noGameSelected && <NoGameSelected setNoGameSelected={setNoGameSelected}/>}
        </>
    )
}