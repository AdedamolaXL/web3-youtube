'use client'

import LivepeerClient from "@/clients/livepeer";
import { LivepeerConfig } from "@livepeer/react";
import UploadPage from "./UploadPage";
import { ApolloProvider } from "@apollo/client";
import ApolloClient from "@/clients/apollo";

export type UploadData = {
    video: string | undefined;
    title: string;
    description: string;
    location: string;
    category: string;
    thumbnail: string;
    UploadedDate: number;
  };

const Upload = () => {

    return (

        <ApolloProvider client={ApolloClient}>
            <LivepeerConfig client={LivepeerClient}>
                <UploadPage />
            </LivepeerConfig>
        </ApolloProvider>
    )
}

export default Upload;