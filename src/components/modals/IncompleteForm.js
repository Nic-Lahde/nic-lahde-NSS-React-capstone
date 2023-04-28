import "./Modals.css"
/** this modal tells the user to finish filling out their form */
export const IncompleteForm = ({setIncompleteForm}) =>{
    return(<><div className="modal--background"></div>
        <div className="modal--body--incomplete">
            <h2 className="modal--header">Please fill out all fields to continue</h2>
            <div className="modal--buttons">
            <button onClick={() => setIncompleteForm(false)}>OK</button>
            </div>
        </div>
    </>
        )
        
       
}