import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../users/Profile"
import { MyGames } from "../users/MyGames"
import { CreateGame } from "../users/CreateGame"
import { HostEvent } from "../events/HostEvent"
import { EventContainer } from "../events/EventContainer"
import { EventDetails } from "../events/EventDetails"
export const ApplicationViews = () => {
    return (<>
        <Routes>
            <Route path="/" element={
                <>
                    <div className="main--header">
                        <img className="main--header--image" alt="two dice" src="https://www.publicdomainpictures.net/pictures/380000/nahled/two-dice-fly-on-the-rool-with-shado.png" />
                        <h1>The Kitchen Table</h1>
                        <img className="main--header--image" alt="four meeples" src="../images/meeples.png" />
                    </div>
                    <h3>Connecting meeple since 2023</h3>

                    <Outlet />
                </>
            }>

                <Route path="profile" element={<Profile />} />
                <Route path="myGames" element={< MyGames />} />
                <Route path="myGames/createGame" element={<CreateGame />} />
                <Route path="hostEvent" element={<HostEvent />} />
                <Route path="findEvent" element={<EventContainer/>}>
                    <Route index element={""}/>
                    <Route path=":eventId" element={<EventDetails />} />            
                </Route>
            </Route>
        </Routes>
        <img className="coffee--stain" alt="a circular coffee stain" src="https://freesvg.org/img/coffeering.png" />
        <img className="paper" alt="sheet of paper" src="https://cdn.pixabay.com/photo/2013/07/12/14/42/education-148605_1280.png" />
        <img className="pencil" alt="pencil" src="https://cdn.pixabay.com/photo/2012/04/01/13/08/pencil-23411_960_720.png" />
        <img className="cool--s" alt="a very cool letter S" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Cool_S.svg/450px-Cool_S.svg.png?20211026093152" />
    </>
    )

}