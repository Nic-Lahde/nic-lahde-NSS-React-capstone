import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IncompleteForm } from "../modals/IncompleteForm"

export const CreateGame = () =>{
    const navigate = useNavigate()
    const localKitchenUser = localStorage.getItem("kitchen_user")
    const kitchenUserObject = JSON.parse(localKitchenUser)
    const [incompleteForm, setIncompleteForm] = useState(false)
    const [newGame, setNewGame] = useState({
        name: "",
        minPlayers: "",
        maxPlayers: "",
        weight: "",
        image: "",
        description: ""
    })
    const newGameObject ={
        name: newGame.name,
        minPlayers: parseInt(newGame.minPlayers),
        maxPlayers: parseInt(newGame.maxPlayers),
        weight: parseFloat(newGame.weight).toFixed(2),
        image: newGame.image,
        description: newGame.description
    }
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        if(newGame.name === "" || newGame.minPlayers === "" || newGame.maxPlayers === "" || newGame.weight === ""){
           setIncompleteForm(true)
        }
        else{
        return fetch(`http://localhost:8088/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGameObject)
        })
            .then(response => response.json())
            .then((selectedGame) => {
                const collectionItem = {
                    gamesId: selectedGame.id,
                    usersId: kitchenUserObject.id
                }
            fetch(`http://localhost:8088/usersGames`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collectionItem)
        }) .then(navigate("/myGames"))
            })}
            
    }
    return(
        <form>
            <h2 className="new__game__title">New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Title of game"
                        value={newGame.name}
                        onChange={
                            (evt) => {
                                const copy = { ...newGame }
                                copy.name = evt.target.value
                                setNewGame(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="minPlayer">Minimum Players</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Minimum number of players"
                        value={newGame.minPlayers}
                        onChange={
                            (evt) => {
                                const copy = { ...newGame }
                                copy.minPlayers = evt.target.value
                                setNewGame(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maxPlayer">Maximum Players</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Maximum number of players"
                        value={newGame.maxPlayers}
                        onChange={
                            (evt) => {
                                const copy = { ...newGame }
                                copy.maxPlayers = evt.target.value
                                setNewGame(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="weight">Weight/Complexity Rating</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Rate from 1 - 5, decimals are allowed"
                        value={newGame.weight}
                        onChange={
                            (evt) => {
                                const copy = { ...newGame }
                                copy.weight = evt.target.value
                                setNewGame(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Image</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Image URL of the game box"
                        value={newGame.image}
                        onChange={
                            (evt) => {
                                const copy = { ...newGame }
                                copy.image = evt.target.value
                                setNewGame(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="A brief description"
                        value={newGame.description}
                        onChange={
                            (evt) => {
                                const copy = { ...newGame }
                                copy.description = evt.target.value
                                setNewGame(copy)
                            }
                        } />
                </div>
            </fieldset>
            <div className="create--game--button"><button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Create game and add to my collection</button></div>
            {incompleteForm && <IncompleteForm setIncompleteForm={setIncompleteForm}/>}
        </form>
    )
}