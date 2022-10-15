import { useMoralis, useWeb3Contract } from "react-moralis"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import { abi, contractAddress } from '../constants/index';
// import { Moralis } from "moralis";
import Web3  from 'web3';
const web3 = new Web3(Web3.givenProvider);

export default function Dashboard() {
    //set Moralis Hooks and state variables
    const { isWeb3Enabled, logout, user, Moralis, isAuthenticated } = useMoralis();
    const router = useRouter();
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ file, setFile ] = useState(null);
    
    // check if wallet is connected, if not push user
    // back to the login screen
    useEffect(() => {
        if(!isWeb3Enabled) {
            router.push('/')
        } 
    }, [isWeb3Enabled]);

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
        <div className="flex w-screen h-screen items-center justify-center">
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
                <button type="submit" className="mt-5 w-full bg-green-700 text-white text-xl rounded-xl animate-bounce">Mint!</button>
                <button onClick={logout} className="mt-5 w-full bg-red-700 text-white text-xl rounded-xl">Logout</button>
            </form>
        </div>
    )
} 