'use client'

import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import ApolloClient from "@/clients/apollo";
import { ApolloProvider } from "@apollo/client";
import  Videos  from "../../components/Videos";
import Background from "../../components/Background"
import Header from "../../layout/Header"
import Sidebar from "../../layout/Sidebar"

interface IProps {
  horizontal?: Boolean;
}

export default function Home() {
  // Creating a state to store the uploaded video
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("")

  // Get the client from the useApolloClient hook
  

   // Query the videoUploadeds from the graph
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
    setLoading(true);
     const { data } = await ApolloClient.query({
       query: GET_VIDEO_UPLOADS,
       fetchPolicy: "network-only",
     });

     console.log("VideoUploadeds", data.videoUploadeds);

     // Set the videoUploadeds to the state
     setVideos(data.videoUploadeds);
     setLoading(false);
   } catch (error) {
     console.error("Error fetching videoUploadeds:", error);
     setLoading(false);
   }
 };

 useEffect(() => {
   // Runs the function getVideos when the component is mounted
   getVideos();
 }, []);

  
  return (
      
        
        <div className="w-full bg-[#1a1c1f] flex flex-row">
           
             <div className="flex flex-row flex-wrap">

              <div className="flex-1 h-screen flex flex-col">
                
                <div className="flex flex-row flex-wrap">
              </div>
              {loading ? (
                <>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="w-80">
                      <Loader />
                    </div>
                  ))}
                </>
              ) : (
                videos?.map((video:any) => (
                  <Videos video={video} key={video.id} horizontal={false} />
                ))
              )}
           </div>       
        </div>
        </div>
        

  );
}

const Loader = () => {
  return (
    <div className="flex flex-col m-5 animate-pulse">
      <div className="w-full bg-gray-300 dark:bg-border-dark h-40 rounded-lg "></div>
      <div className="w-50 mt-3 bg-gray-300 dark:bg-border-dark h-6 rounded-md "></div>
      <div className="w-24 bg-gray-300 h-3 dark:bg-border-dark  mt-3 rounded-md "></div>
    </div>
  );
}
