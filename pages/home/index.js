import { useMoralis, useWeb3Contract } from "react-moralis"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import { abi, contractAddress } from '../constants/index';
// import { Moralis } from "moralis";
import Web3  from 'web3';
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const web3 = new Web3(Web3.givenProvider);

export default function Dashboard() {
    //set Moralis Hooks and state variables
    const { isWeb3Enabled, logout, user, Moralis, isAuthenticated } = useMoralis();
    const router = useRouter();
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ file, setFile ] = useState(null);

    // This function mints our NFT
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // set the file name to capture
            // create a new Moralis file
            // save the new file to IPFS
            const file1 = new Moralis.File(file.name, file);
            await file1.saveIPFS();
            const file1url = file1.ipfs();

            // define the metadata for our NFT
            const metadata = {
                Name, 
                description, 
                image: file1url
            }

            // convert our metadata to base64
            const file2 = new Moralis.File(`${name}metadata.json`, {
                base64: Buffer.from(JSON.stringify(metadata)).toString('base64')
            });
            // save our metadata
            await file2.saveIPFS();
            const metadataurl = file2.ipfs();

            // alternative method of interacting with our contract
            // using Moralis instead of web3
           /* useWeb3Contract({
                abi: abi,
                contractAddress: contractAddress,
                functionName: 'mint',
                params: {
                    _uri: metadataurl,
                },
            }) */
            // create a new web3 contract using our contract address and abi
            // from the nft Minter contract we deplpoyed on polygon
            const contract = new web3.eth.Contract(abi, contractAddress);
            const response = await contract.methods
                .mint(metadataurl)
                .send({ from: user.get('ethAddress') });
            const tokenId = response.events.Transfer.returnValues.tokenId;
            alert(`NFT Minted Successfully.  Contract Address - ${contractAddress} with a token ID of: ${tokenId}`)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <> 
        <Navbar/>
        <div className="flex h-screen items-center justify-center bg-black">
        <span><img className=" w-[100px] " src="/favicon.png" alt="logo"/></span>
        <hero id="hero">  <section id="hero">
          <div className="hero_text">
         <p className="blue_neon">CryptoEscondido</p>
            <h2>
                <span className="wrap hero_text _neon  ">
                    Rewarding Whistleblowers</span>
            </h2>
          </div>
      </section>
      </hero>
        </div>
        <Footer/>
        </>
    )
} 