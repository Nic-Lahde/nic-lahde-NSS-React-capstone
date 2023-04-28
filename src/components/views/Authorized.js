import { Navigate, useLocation } from "react-router-dom"
/**this component checks if the user is logged in and sends them to the login page if they are not */
export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("kitchen_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}
