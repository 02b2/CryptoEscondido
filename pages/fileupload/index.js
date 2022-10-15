import { useMoralis, useWeb3Contract } from "react-moralis"
import { useState } from "react";
import { abi, contractAddress} from '../constants/index';
import { ethers } from "ethers";
import { useNotification } from "web3uikit"
import Web3  from 'web3';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


const web3 = new Web3(Web3.givenProvider)
const PRICE = ethers.utils.parseEther("0.001")


export default function Dashboard() {
    //set Moralis Hooks and state variables
    const { logout, user, Moralis } = useMoralis();
    const { runContractFunction } = useWeb3Contract()
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ file, setFile ] = useState(null);

    const PRICE = 1000000000000000
    const dispatch = useNotification()


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
                name, 
                description, 
                image: file1url,
                price: PRICE,
            }

            // convert our metadata to base64
            const file2 = new Moralis.File(`${name}metadata.json`, {
                base64: Buffer.from(JSON.stringify(metadata)).toString('base64')
            }); 

            // save our metadata
            await file2.saveIPFS();
            const metadataurl = file2.ipfs();

            // create a new web3 contract using our contract address and abi
            // from the nft Minter contract we deplpoyed on polygon
            const contract = new web3.eth.Contract(abi, contractAddress);
            const response = await contract.methods
                .mint(metadataurl)
                .send({ from: user.get('ethAddress') })
            const tokenId = response.events.Transfer.returnValues.tokenId;
            console.log(tokenId)
            console.log("Listing NFT...")
            dispatch({
                type: "success",
                message: "Document Minted Successfully!  Please Continue for Listing.",
                position: "topR",
            })

            const approveOptions2 = {
                abi: abi,
                contractAddress: contractAddress,
                functionName: "approve",
                params: {
                    to: contractAddress,
                    tokenId: tokenId,

                },
            }

            // create new web3 instance with moralis
            await Moralis.enableWeb3();
            await runContractFunction({
               params: approveOptions2,
               onSuccess: () => { console.log("NFT Listed!")},
               onError: (error) => {
                   console.log(error)
               },
           })
            
        
            // set the parameters for listItem
             const approveOptions = {
                abi: abi,
                contractAddress: contractAddress,
                functionName: "listItem",
                params: {
                    nftAddress: contractAddress,
                    tokenId: tokenId,
                    price: PRICE,
                },
            }
            // create new web3 instance with moralis
            // use runContractFunction to run listItem
             await Moralis.enableWeb3();
             await runContractFunction({
                params: approveOptions,
                onSuccess: () => { console.log("NFT Listed!")},
                onError: (error) => {
                    console.log(error)
                },
            })

            dispatch({
                type: "success",
                message: "Document Listed Successfully!  Check the Marketplace for your document.",
                position: "topR",
            })
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <Navbar/>
            <div className="flex w-screen h-screen items-center justify-center bg-black">
                <form onSubmit={onSubmit}>
                    <div className="w-[100px] h-[50px]">
                        <input 
                            type="text" 
                            className=" border-[1px] p-2 border-black text-lg w-[300px]" 
                            placeholder="Document Name"
                            value={name}
                            onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div className="w-[100px] h-[50px] mt-3">
                        <input 
                            type="text" 
                            className=" border-[1px] p-2 border-black text-lg w-[300px]" 
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}></input>
                    </div>
                    <div className="w-[100px] h-[50px] mt-3">
                        <input 
                            type="file" 
                            className="border-[1px] p-2 border-black text-lg w-[300px]" 
                            onChange={(e) => setFile(e.target.files[0])}></input>
        
                    </div>
                    <button type="submit" className="neon_btn mt-5  bg-white text-xl rounded-l animate-bounce">Mint!</button>
                    <button onClick={logout} className="neon_btn mt-5  bg-white text-xl rounded-l">Logout</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
} 