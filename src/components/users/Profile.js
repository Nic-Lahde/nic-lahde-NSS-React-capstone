import { useEffect, useState } from "react"
import { DeleteAccount } from "../modals/DeleteAccount"
import "./Users.css"
/**  this component displays the user's information, allows them to edit their bio, and allows them to delete their account*/
export const Profile = () => {
    const [deleteProfileModal, setDeleteProfileModal] = useState(false)
    const localKitchenUser = localStorage.getItem("kitchen_user")
    const kitchenUserObject = JSON.parse(localKitchenUser)

    const [profile, setProfile] = useState({
        name:"",
        email:"",
        bio:""
    })
    /**retrieves the user's information */
    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${kitchenUserObject.id}`)
            .then(res => res.json())
            .then ((selectedProfile) => {
                setProfile(selectedProfile)
            })
        },
        []
    )
    /** saves changes to the bio/about me section of user's profile */
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/users/${kitchenUserObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
        .then(response => response.json())
    }
    return <article className="profile">
        <section>Name: {profile.name}</section>
        <section>Email: {profile.email}</section>
        <section>About Me: {profile.bio}</section>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Edit About Me:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        id="edit--bio"
                        placeholder="Edit your bio"
                        value={profile.bio}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.bio = evt.target.value
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="update--profile--button" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Update Profile</button>
            <button className="delete--profile--button" onClick={() => setDeleteProfileModal(true)}>Delete My Account</button>
            {deleteProfileModal && <DeleteAccount setDeleteProfileModal={setDeleteProfileModal} id={kitchenUserObject.id}/>}
    </article>
}
