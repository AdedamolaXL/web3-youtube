'use client'

import { ApolloProvider } from "@apollo/client";
import { LivepeerConfig } from "@livepeer/react";
import LivepeerClient from "@/clients/livepeer";
import ApolloClient from "@/clients/apollo";
import Video from "./page"

export type Video = {
    id: string;
    // other properties...
  };

export default function VideoPlayer() {
    const urlParams = new URLSearchParams(window.location.pathname); 
    const id = urlParams.get('id') as string;

    return (
        <ApolloProvider client={ApolloClient}>
            <LivepeerConfig client={LivepeerClient}>
                <Video params ={{ id }} />
            </LivepeerConfig>
        </ApolloProvider>
    )
}