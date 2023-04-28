import "./Modals.css"
import { useEffect, useState } from "react"
/** this modal displays a user's profile and their game collection */
export const UserDetails = ({ setUserDetails, userId }) => {

    const [selectedUserCollection, setSelectedUserCollection] = useState([])
    /** this retrieves a users game collection and profile */
    useEffect(
        () => {
             fetch(`http://localhost:8088/usersGames?usersId=${userId}&_expand=games&_expand=users`)
            .then(res => res.json())
            .then(data => {
                const sortedData = data.sort((a, b) => a.games.name.localeCompare(b.games.name))
                setSelectedUserCollection(sortedData)
            })
        },
        []
    )
    return (<><div className="modal--background"></div>
        <div className="modal--body--user">
            <h2 className="modal--header">{selectedUserCollection[0]?.users?.name}</h2>
            <p>Email: {selectedUserCollection[0]?.users?.email}</p>
            <p>About: {selectedUserCollection[0]?.users?.bio}</p>
                <h3>{selectedUserCollection.length} items in collection</h3>
            <div className="modal--collection">
            {
                selectedUserCollection.map(game => <p className="collection--list--item"
                    key={`collection--${game.id}`}><img className="collection--item--image" alt="game box" src={game?.games?.image}/>
                    {game?.games?.name} for {game?.games?.minPlayers} - {game?.games?.maxPlayers} players. Weight: {game?.games?.weight}
                    </p>
                )
            }</div>
            <div className="modal--buttons">
                <button onClick={() => setUserDetails(false)}>Dismiss</button>
            </div>
        </div>
    </>
    )


}