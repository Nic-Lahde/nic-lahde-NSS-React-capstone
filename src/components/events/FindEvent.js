import { useEffect, useState } from "react"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useNavigate } from "react-router-dom"
import "./Events.css"
/** this function matches players to an event, then checks the number of matching players against the maximum number of players for the game being played at that event 
 *and returns the number of empty seats
 */
export const remainingSeats = (event, allPlayers) => {
    const playerList = allPlayers.filter(player => player.eventsId === event.id)
    const playerCount = playerList.length + 1
    const availableSeats = event?.games?.maxPlayers - playerCount
    return availableSeats
}
/**this function displays all events excluding those on past dates 
 * it shows whether the event is full
 * users can filter the list by date range, game being played, or game weight/complexity
*/
export const FindEvent = ({refreshSwitch}) => {
    const [allEvents, setAllEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const [allPlayers, setAllPlayers] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [selectedOption, setSelectedOption] = useState("")
    const [dateSearchTerms, setDateSearchTerms] = useState({
        startDate: "",
        endDate: ""
    })
    const [weightSearchTerms, setWeightSearchTerms] = useState(0)
    const navigate = useNavigate()
    /** gets all the events from the database, puts them in chronological order, and excludes events from past dates */
    useEffect(
        () => {
            fetch(`http://localhost:8088/events?_expand=games&_expand=users`)
                .then(res => res.json())
                .then(data => {
                    const sortedData = data.sort((a, b) => a.date.localeCompare(b.date))
                    const filteredData = sortedData.filter(event => new Date(event.date) >= new Date())
                    setAllEvents(filteredData)
                    setFilteredEvents(filteredData)
                })

        },
        [refreshSwitch]
    )
    /** gets all the players(users who have joined a game and are not the host) from the database */
    useEffect(
        () => {
            fetch(`http://localhost:8088/players`)
                .then(res => res.json())
                .then(data => {
                    setAllPlayers(data)
                })

        },
        [refreshSwitch]
    )
    /** filter the displayed events by the name of the game being played */
    useEffect(
        () => {
            const searchedEvents = allEvents.filter(event => event?.games?.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFilteredEvents(searchedEvents)
        },
        [searchTerms]
    )
    /** filter the displayed events that are occuring between a start and end date */
    useEffect(() => {
        const searchedEvents = allEvents.filter(event => {
            return dateSearchTerms.startDate <= event.date && event.date <= dateSearchTerms.endDate;
        });
        setFilteredEvents(searchedEvents);
    }, [dateSearchTerms]);
    /** filter the displayed events by the weight/complexity of the game being played */
    useEffect(() => {
        const searchedEvents = allEvents.filter(event => event?.games?.weight >= weightSearchTerms && event?.games?.weight < weightSearchTerms + 1)
        setFilteredEvents(searchedEvents)
    },[weightSearchTerms])
    /** this indicates which search parameter is being used if any */
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }
    /** this will cause the EventDetails component to render in the middle of the page and display the details of the clicked event */
    const handleDetailsButton = (eventId) => {
        navigate(`/findEvent/${eventId}`)
    }
    return (
        <>
            <h1 className="myEvents__header">Search for Events</h1>
            <div className="radio--buttons">
                <div >
                    <label>
                        <input
                            type="radio"
                            name="options"
                            value="game"
                            checked={selectedOption === "game"}
                            onChange={handleOptionChange}
                        />
                        Search by game
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="options"
                            value="date"
                            checked={selectedOption === "date"}
                            onChange={handleOptionChange}
                        />
                        Search by date
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="options"
                            value="weight"
                            checked={selectedOption === "weight"}
                            onChange={handleOptionChange}
                        />
                        Search by weight
                    </label>
                </div>
                {selectedOption === "game" && (<input
                    onChange={
                        (changeEvent) => {
                            setSearchTerms(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="Search by game" />)}
            </div>
            {selectedOption === "date" && (<div><fieldset>
                <div className="form-group">
                    <label>Search by date range</label>
                    <input
                        required autoFocus
                        type="datetime-local"
                        className="form-control"
                        placeholder="Search by start date"
                        value={dateSearchTerms.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...dateSearchTerms }
                                copy.startDate = evt.target.value
                                setDateSearchTerms(copy)
                            }
                        } />
                </div>
            </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>to</label>
                        <input
                            required autoFocus
                            type="datetime-local"
                            className="form-control"
                            placeholder="and end date"
                            value={dateSearchTerms.endDate}
                            onChange={
                                (evt) => {
                                    const copy = { ...dateSearchTerms }
                                    copy.endDate = evt.target.value
                                    setDateSearchTerms(copy)
                                }
                            } />
                    </div>
                </fieldset></div>)}
                {selectedOption === "weight" && (<select
                    className="form-control"
                    onChange={
                        (changeEvent) => {
                            const parsedValue = parseInt(changeEvent.target.value)
                            setWeightSearchTerms(parsedValue)
                        }
                    }
                     ><option defaultValue="0">Weight/complexity rating</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4 +</option></select>)}
            <div className="show--all--events--container">
                <div className="show--all--events--button">
                    <button onClick={() => { setFilteredEvents(allEvents); setSelectedOption(""); }}>Show All Events</button>
                </div>
                <div className="results--box">
                    {filteredEvents.map((event) => {
                        const dateString = event.date;
                        const dateObj = new Date(dateString);
                        const options = {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        };
                        const readableDate = dateObj.toLocaleString("en-US", options);
                        const availableSeats = remainingSeats(event, allPlayers)
                        return (
                            <section
                                className="event--list--item"
                                key={`event--${event.id}`}
                            >
                                {event?.games?.name} on {readableDate} {availableSeats === 0 && (<p className="full--tag">FULL</p>)}
                                <button className="details--button" key={event.id} onClick={() => handleDetailsButton(event.id)}>
                                    Event Details
                                </button>
                            </section>

                        );

                    }
                    )
                    }</div>
            </div>
        </>
    );
}