'use client'

import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import ApolloClient from "@/clients/apollo";
import { ApolloProvider } from "@apollo/client";
import  Videos  from "../../components/Videos";
import Background from "../../components/Background"
import Header from "../../layout/Header"
import Sidebar from "../../layout/Sidebar"



export default function Home() {
  // Creating a state to store the uploaded video
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("")

  // Get the client from the useApolloClient hook
  

  // Query the videos from the the graph
  const GET_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: Video_filter
    ) {
      videos(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: $where
      ) {
        id
        hash
        title
        description
        location
        category
        thumbnailHash
        date
        author
        createdAt
      }
    }
  `;

  // Function to get the videos from the graph
  const getVideos = async () => {
    setLoading(true);






    console.log("Query Variables:", {
      first: 200,
      skip: 0,
      orderBy: "createdAt",
      orderDirection: "desc",
      where: {
        ...(query && {
          title_contains_nocase: query,
        }),
        ...(category && {
          category_contains_nocase: category,
        }),
      },
    });
  

    // Query the videos from the graph
    ApolloClient
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 200,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "desc",

          // Search for videos
          where: {
            ...(query && {
                title_contains_nocase:query,
            }),
            ...(category && {
              category_contains_nocase: category,
            }),
          },
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        console.log("Videos", data.videos);

        // Set the videos to the state
        setVideos(data.videos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    
    // Runs the function getVideos when the component is mounted
    getVideos();
  }, [query, category]);
  
  return (
      
        <Background className="w-full">
        <div className="w-full bg-[#1a1c1f] flex flex-row">
            <Sidebar updateCategory={(category) => setCategory(category)} />
             <div className="flex flex-row flex-wrap">

              <div className="flex-1 h-screen flex flex-col">
                <Header search={(text) => setQuery(text)} />
                <div className="flex flex-row flex-wrap">
              </div>
              {loading ? (
                <>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="w-50">
                      <Loader />
                    </div>
                  ))}
                </>
              ) : (
                videos?.map((video: any) => (
                  <Videos video={video} horizontal={false} />
                ))
              )}
           </div>       
        </div>
        </div>
        </Background>

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
