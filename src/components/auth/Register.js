import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
/** this allows a user to create an account and then logs them in with that account*/
export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        name: "",
        bio:""
    })
    let navigate = useNavigate()
/** this creates the user in the database and then gets the id the database assigned to them and puts it into local storage to be used throughout the app
 * then it navigates the user to the homepage
 */
    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("kitchen_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/")
                }
            })
    }
/** this checks the database to see if the email is already in use. If it is, displays an error message. If not then runs registerNewUser to create a new user  */
    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }
/** this function collects the information from the form fields so then can be sent to the database when the account is created */
    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for the Kitchen Table</h1>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input onChange={updateUser}
                           type="text" id="bio" className="form-control"
                           placeholder="Tell us about yourself" required autoFocus />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

