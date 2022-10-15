import { useEffect, useState } from "react"
import { isWeb3Enabled, useMoralis, useWeb3Contract } from "react-moralis"
import { Card, useNotification } from "web3uikit";
import Image from "next/image";
import { ethers } from "ethers";
import UpdateListingModal  from "./UpdateListingModal";
import BuyItemModal from "./BuyItemModal";
import { abi, contractAddress } from "../pages/constants";



export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {

const [imageURI, setImageURI] = useState("")
const [isURILoaded, setIsURILoaded] = useState(false)
const [tokenName, setTokenName] = useState("")
const [showModal, setShowModal] = useState(false)
const [showBuyModal, setShowBuyModal] = useState(false)
const { user } = useMoralis()
const dispatch = useNotification()


async function updateUI() {
    const options = {method: 'GET', headers: {accept: 'application/json', 'X-API-Key': 'test'}};
    // fetch metadata from Moralis server
    // convert data to JSON object
    // extract token_uri from the metadata
    // fetch the uri data
    // convert uri data to JSON object
    // extract and define image URL 
    const metadata = await fetch('https://deep-index.moralis.io/api/v2/nft/0x3FCa32120c814f5a2c8ec1307f4675c279212c9D?chain=mumbai&format=decimal', options)
    const metadataObject = await metadata.json()
    const uri = metadataObject.result[tokenId].token_uri
    const imageObject = await fetch(uri)
    const URL = await imageObject.json()
    const image = URL.image
    const tokenName = URL.name
    
    setImageURI(image)
    setTokenName(tokenName)

    }

useEffect(() =>{
    if(!isURILoaded){
    updateUI()
    setIsURILoaded(true);
    }
}, [isWeb3Enabled])

const handleCardClick = () => {
    seller === user.get('ethAddress') ? setShowModal(true) : setShowBuyModal(true)
    
}

const onClose = () => {
    setShowModal(false)
    setShowBuyModal(false)
}


    return (
        <div className="w-[450px] h-[400px] bg-black text-white text-4xl mx-auto">
           <div className="w-[400px] h-[400px]">
                {imageURI ? ( 
                <div>
                    <UpdateListingModal isVisible={showModal} onClose={onClose} nftAddress={nftAddress} tokenId={tokenId}/>
                    <BuyItemModal isVisible={showBuyModal} onClose={onClose} nftAddress={nftAddress} tokenId={tokenId} price={price}/>
                <Card title={tokenName} onClick={handleCardClick}>
                    <div className="p-2">
                    <div className="flex flex-col items-center gap-2">
                    <div>#{tokenId}</div>
                    <Image unoptimized="true" loader={() => imageURI} src={imageURI} height="200" width="200"/> 
                    <div className="font-bold">Price: {ethers.utils.formatUnits(price, "ether")} ETH</div>
                    </div>
                    </div>
                </Card>
                </div>
               ) : (
                    <div>Loading...</div> 
               )}
           </div>
        </div>
    )
}