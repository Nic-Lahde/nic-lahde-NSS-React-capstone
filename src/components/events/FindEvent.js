import { useEffect, useState } from "react"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useNavigate } from "react-router-dom"
import "./Events.css"

export const remainingSeats = (event, allPlayers) => {
    const playerList = allPlayers.filter(player => player.eventsId === event.id)
    const playerCount = playerList.length + 1
    const availableSeats = event?.games?.maxPlayers - playerCount
    return availableSeats
}

export const FindEvent = () => {
    const [allEvents, setAllEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const [allPlayers, setAllPlayers] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const [selectedOption, setSelectedOption] = useState("")
    const [dateSearchTerms, setDateSearchTerms] = useState({
        startDate: "",
        endDate: ""
    })
    const navigate = useNavigate()
    useEffect(
        () => {
            fetch(`http://localhost:8088/events?_expand=games&_expand=users`)
                .then(res => res.json())
                .then(data => {
                    const sortedData = data.sort((a, b) => a.date.localeCompare(b.date))
                    setAllEvents(sortedData)
                    setFilteredEvents(sortedData)
                })

        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/players`)
                .then(res => res.json())
                .then(data => {
                    setAllPlayers(data)
                })

        },
        []
    )
    
    useEffect(
        () => {
            const searchedEvents = allEvents.filter(event => event?.games?.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFilteredEvents(searchedEvents)
        },
        [searchTerms]
    )
    useEffect(() => {
        const searchedEvents = allEvents.filter(event => {
            return dateSearchTerms.startDate <= event.date && event.date <= dateSearchTerms.endDate;
        });
        setFilteredEvents(searchedEvents);
    }, [dateSearchTerms]);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
    }
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