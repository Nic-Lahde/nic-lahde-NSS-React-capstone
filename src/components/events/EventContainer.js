import { Outlet } from "react-router-dom"
import { FindEvent } from "./FindEvent"
import { MyEvents } from "./MyEvents"
import { useState } from "react"

export const EventContainer = () => {
    const [refreshSwitch, setRefreshSwitch] = useState(false)
    return <>
                <MyEvents refreshSwitch={refreshSwitch} />
                <Outlet context={[refreshSwitch, setRefreshSwitch]}/>
                <FindEvent refreshSwitch={refreshSwitch} />              
           </>
}