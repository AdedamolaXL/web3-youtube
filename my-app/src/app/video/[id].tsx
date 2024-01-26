'use client'

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import  Videos from "../../components/Videos";
import ApolloClient from "@/clients/apollo";
import Link from "next/link";
import moment from 'moment';
import { BiCheck } from "react-icons/bi";
import Avvvatars from 'avvvatars-react'
import { IVideo } from "@/types";
import VideoComponent from "../../components/VideoContainer";
import { gql } from "@apollo/client";
import Player from "@/components/Player";

import { ApolloProvider } from "@apollo/client";
import { LivepeerConfig } from "@livepeer/react";
import LivepeerClient from "@/clients/livepeer";


export type Video = {
  id: string;
  // other properties...
};

export default function Video() {
  const router = useRouter()
  const { id } = router.query
  const [video, setVideo] = useState<IVideo | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<IVideo[]>([])


  console.log("Router Query ID:", id);

  const GET_VIDEO_UPLOADS = gql`
    query {
      videoUploadeds {
      id
      Youtube_id
      hash
      title
      thumbnailHash
      category
      author
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
  
    setRelatedVideos(data.videoUploadeds.filter((v: Video) => v.id !== id))
    const video = data?.videoUploadeds?.find((video: Video) => String(video.id)=== String(id))
    setVideo(video)
    console.log('videos', data.videoUploadeds)
 
  } catch(err) {
    console.error("err", err);
  }
  
  };

  useEffect(() => {
    getVideos()
  }, [id])

  return (
    
    <ApolloProvider client={ApolloClient}>
    <LivepeerConfig client={LivepeerClient}>

      <div className="flex-1 flex flex-col">
        {video && (
          <div className="flex flex-col m-10 justify-between      lg:flex-row">
            <div className="lg:w-4/6 w-6/6">
              <Player id={video.id} />
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
