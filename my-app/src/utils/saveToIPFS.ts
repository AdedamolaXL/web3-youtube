import axios from "axios";


const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;


const saveToIPFS = async (file: File) => {
    
    // Create a new multipart form data
    const formData = new FormData();

    // add file to the form data
    formData.append("file", file)

    const metadata = JSON.stringify({
        name: "File name",
    })
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: Infinity,
            headers: {
            'Authorization': `Bearer ${PINATA_JWT}`
        }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }  
}
   
export default saveToIPFS;