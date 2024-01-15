'use client'

import { createReactClient, studioProvider } from "@livepeer/react";
import dotenv from "dotenv"

dotenv.config()

const LIVEPEER_KEY = 'process.env.NEXT_PUBLIC_LIVEPEER_KEY';


const LivepeerClient = createReactClient({
    provider: studioProvider({
        apiKey: LIVEPEER_KEY
    })
});

export default LivepeerClient;