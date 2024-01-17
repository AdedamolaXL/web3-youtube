import axios from "axios";

const LIVEPEER_KEY = process.env.NEXT_PUBLIC_LIVEPEER_KEY;

const uploadToLivepeer = async (file: File) => {

    const formData = new FormData();

    formData.append("file", file)

    // const metadata = JSON.stringify({
    //     name: "File name",
    // })
    // formData.append('livepeerMetadata', metadata);

    // const options = JSON.stringify({
    //     cidVersion: 0,
    // })
    // formData.append('livepeerOptions', options);

    try {
        const res = await axios.post("https://livepeer.studio/api/asset/request-upload", formData, {
            headers: {
                'Authorization': `Bearer ${LIVEPEER_KEY}`,
                'Content-Type': 'application.json',
            },
           
        });
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export default uploadToLivepeer;