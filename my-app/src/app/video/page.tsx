'use client'

import React, { useEffect, useState } from "react";
import ApolloClient  from "@/clients/apollo";
import { ApolloProvider } from "@apollo/client";
import { LivepeerConfig } from "@livepeer/react";
import LivepeerClient from "@/clients/livepeer";
import VideoPage from "./VideoPage";

export type Video = {
    id: string | undefined;
}

const Video = () => {

    return (

        <ApolloProvider client={ApolloClient}>
            <LivepeerConfig client={LivepeerClient}>
                <VideoPage />
            </LivepeerConfig>
    </ApolloProvider>
    )
}

export default Video;