import React, { useEffect } from "react";
import { useAsset } from "@livepeer/react";
import Plyr, { PlyrInstance } from "plyr-react";
import "plyr-react/plyr.css";
import { useEffect } from "react";

export default function Player({ id }) {
    
    console.log("Player component - ID:", id);


    const { data: asset } = useAsset(asset?.id);

    
    useEffect(() => {
        // Fetch data based on the new ID
        // ...
      }, [id]);

    return (
        <Plyr
            source={{
                type: "video",
                title: asset?.name,

                sources: [
                    {
                        src: asset?.downloadUrl,
                        type: "video/mp4",
                    },
                ],
            }}
            options={{
                autoplay: true,
            }}
                autoplay={true}
            />
    );
}