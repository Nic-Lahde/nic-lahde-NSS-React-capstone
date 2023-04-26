import "./Modals.css"
export const NoGameSelected = ({setNoGameSelected}) =>{
    return(<><div className="modal--background"></div>
        <div className="modal--body--incomplete">
            <h2 className="modal--header">Please select a game</h2>
            <div className="modal--buttons">
            <button onClick={() => setNoGameSelected(false)}>OK</button>
            </div>
        </div>
    </>
        )
        
       
}