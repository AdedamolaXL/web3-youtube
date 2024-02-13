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
import getToken from "@/utils/getToken";
import { getUserAddress } from "@/utils/getUserAddress";

import { ApolloProvider } from "@apollo/client";
import { LivepeerConfig } from "@livepeer/react";
import LivepeerClient from "@/clients/livepeer";

import axios from 'axios';



export type Video = {
  id: string;
  // other properties...
};



export default function Video() {
  
  const [video, setVideo] = useState<IVideo | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<IVideo[]>([])
  const [calculationResult, setCalculationResult] = useState<number | null>(null);
  const [userAddress, setUserAddress] = useState<string>("");


  const params = useParams();
  const videoid = params.videoid;

  console.log(videoid)
  
  console.log(params)

  const GET_VIDEO_UPLOADS = gql`
    query {
      videoUploadeds {
      id
      Pietube_id
      hash
      title
      description
      location
      category
      thumbnailHash
      livepeerID
      date
      author
      duration
      bitrate
      size
      }
    }
  `;

  // Function to get the videos from the graph
  const getVideos = async () => {


    try {
      const { data } = await ApolloClient.query({
        query: GET_VIDEO_UPLOADS,
        fetchPolicy: "network-only",
      });
  
      setRelatedVideos(data.videoUploadeds.filter((v: any) => v.hash !== videoid))
      const video = data?.videoUploadeds?.find((video: any) => (video.hash)=== (videoid))

      console.log(video)

      if (!video) {
        console.log(`Video with ID ${videoid} not found.`);
      } else {
        console.log('Found video:', video);
      }

      setVideo(video)
      console.log('videos', data.videoUploadeds)
      
      const address = await getUserAddress();
      setUserAddress(address);

    } catch(err) {
    console.error("err", err);
    }
  
  };

  useEffect(() => {
    getVideos()
  }, [videoid])



    // Conditional rendering
    if (!video) {
      // You can render a loading state or return null
      return <p>Loading...</p>;
    }

    const handleCalculate = () => {
      if (video) {
          const result = (video.duration / 60) * Math.pow(video.bitrate, -0.5) * Math.pow(video.size, 0.8);
          const token = Math.ceil(result)
          console.log(token)
          setCalculationResult(token);
      }
    };



    const mintTokens = async () => {
      try {
        if (calculationResult && userAddress) {
          // let transaction = await getToken()

          // await transaction.mint(userAddress, calculationResult);
          // console.log("Tokens minted successfully:", calculationResult + 'Pi', userAddress)
          
          const response = await axios.post("http://localhost:5000/mintTokens", {
            amount: calculationResult,
            address: userAddress,
          });

          console.log("Tokens minted successfully:", response.data)
        
        }
      } catch (error) {
        console.error("error minting", error);
      }
    };


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

              <div>
                <button onClick={handleCalculate}>Calculate</button>
              </div>
              {calculationResult !== null && (
                <div>
                  <p>Calculation Result: {calculationResult}</p>
                  <button onClick={mintTokens}>Mint Tokens</button>
                </div>
              )}

            </div>

            

        )}
      </div>
    

      </LivepeerConfig>
    </ApolloProvider>

  );
}