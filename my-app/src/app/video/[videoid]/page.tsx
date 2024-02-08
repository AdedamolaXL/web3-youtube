'use client'

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import  Videos from "../../../components/Videos";
import ApolloClient from "@/clients/apollo";
import Link from "next/link";
import moment from 'moment';
import { BiCheck } from "react-icons/bi";
import Avvvatars from 'avvvatars-react'
import { IVideo } from "@/types";
import { gql } from "@apollo/client";
import Player from "@/components/Player";

import { ApolloProvider } from "@apollo/client";
import { LivepeerConfig } from "@livepeer/react";
import LivepeerClient from "@/clients/livepeer";
import { abi } from "../../../constants/areon";
import { Contract_Address } from "../../../constants/areon";
import { ethers } from "ethers";


export type Video = {
  id: string;
  // other properties...
};



export default function Video() {
  
  const [video, setVideo] = useState<IVideo | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<IVideo[]>([])

  const params = useParams();
  const videoid = params.videoid;

  console.log(videoid)
  console.log(params)

  // Ethereum provider and contract address (replace these with your actual values)
  const provider = new ethers.JsonRpcProvider("https://testnet-rpc.areon.network"); 
  const contract = new ethers.Contract(Contract_Address, abi, provider);

  const getVideos = async () => {
    try {
      

      // Call the appropriate function on your smart contract to retrieve videos
      const allVideos = await contract.getVideos();

      // Call the function to get video properties
      const [videoId, videoHash, videoTitle, videoLivepeerID] = await contract.getVideosWithProperties();

      // Combine video information and properties
      const videosData = allVideos.map((video: any, index: any) => ({
        id: Number(video.id),
        hash: video.hash,
        title: video.title,
        description: video.description,
        thumbnailHash: video.thumbnailHash,
        duration: video.duration,
        livepeerID: video.livepeerID,
        author: video.author    
        // Add other properties as needed from videoIds, videoHash, etc.
      }));

      setRelatedVideos(videosData.filter((video:any) => video.hash !== (videoid)));
      const video = videosData.find((video:any) => video.hash === (videoid));

      console.log(video)
      
      if (!video) {
        console.log(`Video with ID ${videoid} not found.`);
      } else {
        console.log('Found video:', video);
      }

      setVideo(video);

    } catch (error) {
      console.error("Error fetching videos:", error);
     
    }
  };

  useEffect(() => {
    // Runs the function getVideos when the component is mounted
    getVideos();
  }, [videoid]);

  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    
    <ApolloProvider client={ApolloClient}>
    <LivepeerConfig client={LivepeerClient}>

      <div className="flex-1 flex flex-col">
        {video && (
          <div className="flex flex-col m-10 justify-between      lg:flex-row">
            <div className="lg:w-4/6 w-6/6">
              <Player id={video.livepeerID} />
              <div className="border-border-light dark:border-border-dark flex flex-row justify-between border b-2 py-4">
              <div>
                <h3 className="text-transform: text-2xl capitalize dark:text-white">
                  {video.title}
                </h3>
                <p className="mt-1 text-gray-500">
                  {video.category} ~ {' '}
                  {moment(new Date(Number(video.createdAt) * 1000)).fromNow()}
                </p>
              </div>
              </div>

              <div>
                <div className="mt-5 flex flex-row items-center">
                  <div className="w-12">
                    <Avvvatars value={video.author.slice(2, 13)} size={50} />
                  </div>                  

                  <div className="ml-3 flex flex-col">
                    <p className="text-md mt-1 flex items-center text-black dark:text-white">
                      {video.author.slice(0, 13)}...{' '}
                    <BiCheck size="20px" className="fill-gray ml-1" />
                    </p>
                    <p className="text-subtitle-light flex items-center text-sm">
                      Video by {video.author}
                    </p>
                  </div>
                </div>
                
                <p className="text-text-light dark:text-text-dark-text-textSubtTitle mt-4 ml-16 text-sm">
                  {video.description}
                </p>
              </div>
              </div>
              
              <div className="w-2/6">
                <h4 className="text-md ml-5 mb-3 font-bold text-black dark:text-white">
                  Related Videos
                </h4>
                {relatedVideos.map((video) => (
                  <Link href={`/video/${video.id}`} key={video.id}>
                    <Videos video={video} horizontal={true} />
                  </Link>
                ))}
              </div>
            </div>
        )}
      </div>
    

      </LivepeerConfig>
    </ApolloProvider>

  );
}
