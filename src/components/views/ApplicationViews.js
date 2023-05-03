import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import { Profile } from "../users/Profile"
import { MyGames } from "../users/MyGames"
import { CreateGame } from "../users/CreateGame"
import { HostEvent } from "../events/HostEvent"
import { EventContainer } from "../events/EventContainer"
import { EventDetails } from "../events/EventDetails"
import "./WelcomeMessage.css"
/** this component is the main switchboard for which components should be rendered based on the current URL */
export const ApplicationViews = () => {
    const location = useLocation()
    return (<>
        <Routes>
            <Route path="/" element={
                <>
                    <div className="main--header">
                        <img className="main--header--image" alt="two dice" src="../images/two-dice.png" />
                        <h1>The Kitchen Table</h1>
                        <img className="main--header--image" alt="four meeples" src="../images/meeples.png" />
                    </div>
                    <h3>Connecting meeple since 2023</h3>
                    {location.pathname === "/" ? (<div className="welcome--message">
                        <p >Welcome to The Kitchen Table, the place for board game enthusiasts!</p>
                        <p>You can schedule board game sessions,
                            join others' games, and keep track of your collection.
                            Whether you're looking for a light party game or a game with a 200 page rulebook,
                            The Kitchen Table has something for everyone.</p>
                        <p> Grab some snacks and drinks, it's game night! </p>
                    </div>
                    ) : ""}
                    <Outlet />
                </>
            }>

                <Route path="profile" element={<Profile />} />
                <Route path="myGames" element={< MyGames />} />
                <Route path="myGames/createGame" element={<CreateGame />} />
                <Route path="hostEvent" element={<HostEvent />} />
                <Route path="findEvent" element={<EventContainer />}>
                    <Route index element={""} />
                    <Route path=":eventId" element={<EventDetails />} />
                </Route>
            </Route>
        </Routes>
        <img className="coffee--stain" alt="a circular coffee stain" src="https://freesvg.org/img/coffeering.png" />
        <img className="paper" alt="sheet of paper" src="https://cdn.pixabay.com/photo/2013/07/12/14/42/education-148605_1280.png" />
        <img className="pencil" alt="pencil" src="https://cdn.pixabay.com/photo/2012/04/01/13/08/pencil-23411_960_720.png" />
        <img className="cool--s" alt="a very cool letter S" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Cool_S.svg/450px-Cool_S.svg.png?20211026093152" />
        <footer className="main--footer">This is where I'd put my credits and copyright information. IF I HAD ANY</footer>
    </>
    )

}