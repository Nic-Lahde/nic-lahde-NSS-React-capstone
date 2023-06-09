import { useNavigate } from "react-router-dom"
import "./Modals.css"
/**this is a modal to confirm whether a user really wants to delete their account */
export const DeleteAccount = ({setDeleteProfileModal, id}) =>{
    const navigate = useNavigate()
    /** this deletes the user's account from the database and navigates them to the login screen */
    const handleDeleteButtonClick = (event) =>{
        event.preventDefault()
        fetch(`http://localhost:8088/users/${id}`,{
            method: "DELETE"
            }).then(navigate("/login"))
        }
    
    return(<><div className="modal--background"></div>
        <div className="modal--body">
            <h2 className="modal--header">This action is irreversible.</h2>
            <h2 className="modal--header">Are you sure?</h2>
            <div className="modal--buttons">
            <button onClick={(handleDeleteButtonClick)}>Delete My Account</button>
            <button onClick={() => setDeleteProfileModal(false)}>Cancel</button>
            </div>
        </div>
    </>
        )
        
       
}