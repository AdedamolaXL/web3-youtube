'use client'

import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import ApolloClient from "@/clients/apollo";
import { ApolloProvider } from "@apollo/client";
import  Videos  from "../../components/Videos";
import Home from "./home";

// import { Header } from "../../components/Header";





export default function Main() {
  
  
  return (

    <ApolloProvider client={ApolloClient}>
      <Home />
    </ApolloProvider>
  );
}

