import { Token_ABI } from "../constants/avalanche";
import { Token_Address } from "../constants/avalanche";
import { ethers } from "ethers";

export default async function getToken() {
    
    // Creating a new provider
    const provider = new ethers.BrowserProvider(window.ethereum);

    try {
        
    // Getting the signer
    const signer = await provider.getSigner();
    
    // Creating a new contract factory with the signer, address and ABI
    let contract = new ethers.Contract(
      Token_Address,
      Token_ABI,
      signer
    );
    
    // Returning the contract
    return contract;
    } catch (error) {

        // Handle any errors that might occur during provider or signer interactions
        console.error("Error fetching contract:", error);
        throw error; // Rethrow to allow handling at higher level
    }
    
  }
  