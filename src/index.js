import { Kitchen } from "./components/Kitchen"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
/**this sets up the React application creates a root container and then runs the Kitchen module in that container */
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Kitchen />
    </BrowserRouter>
)

