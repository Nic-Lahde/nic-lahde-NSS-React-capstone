import { useEffect, useState } from "react"
// import "./Users.css"

export const Profile = () => {

    const localKitchenUser = localStorage.getItem("kitchen_user")
    const kitchenUserObject = JSON.parse(localKitchenUser)

    const [profile, setProfile] = useState({
        name:"",
        email:"",
        bio:""
    })
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
                    <label htmlFor="name">About me:</label>
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
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Update profile</button>
    </article>
}
