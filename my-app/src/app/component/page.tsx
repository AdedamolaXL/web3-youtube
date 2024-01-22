'use client'

import LivepeerClient from "@/clients/livepeer";
import { LivepeerConfig } from "@livepeer/react";
import Test from "./Test";



const TestPage = () => {

    return (

        <LivepeerConfig client={LivepeerClient}>
            <Test />
        </LivepeerConfig>
    )
}

export default TestPage;