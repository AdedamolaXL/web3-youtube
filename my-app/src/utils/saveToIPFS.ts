import axios from "axios";
import dotenv from 'dotenv';

dotenv.config()

const PINATA_JWT = process.env.PINATA_JWT;

const saveToIPFS = async (file: File) => {
    
    // Create a new multipart form data
    const formData = new FormData();

    // add file to the form data
    formData.append("file", file)

    var config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        headers: {
            authorization: `Bearer ${PINATA_JWT}`,
            "content-type": "multipart/form-data",
        },
        data: formData,
    };

    // Posting the form data to the IPFS API
    const response = await axios(config);

    // returning the CID
    return response.data.cid
};

export default saveToIPFS;