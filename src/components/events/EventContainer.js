import { Outlet } from "react-router-dom"
import { FindEvent } from "./FindEvent"
import { MyEvents } from "./MyEvents"
import { useState } from "react"

/**this component passes props to 3 children so they can refresh at the same time when EventDetails(the outlet) changes*/
export const EventContainer = () => {
    const [refreshSwitch, setRefreshSwitch] = useState(false)
    return <>
                <MyEvents refreshSwitch={refreshSwitch} />
                <Outlet context={[refreshSwitch, setRefreshSwitch]}/>
                <FindEvent refreshSwitch={refreshSwitch} />              
           </>
}