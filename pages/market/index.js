import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useMoralisQuery, useMoralis } from "react-moralis";
import { ethers } from "ethers";
import NFTBox from "../../components/NFTBox";

export default function Market() {
    const { data: ListedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(10).ascending("tokenId")
    ) 
    console.log(ListedNfts)

    return (
        <>
        <Navbar/>
        
             <div className="text-black text-1xl bg-black grid">
        <hero className="flex justify-center" id="hero">  <section id="hero">
        <span><img className=" w-[40px] " src="/favicon.png" alt="logo"/></span>
          <div className="hero_text">
         <p className="blue_neon">CryptoEscondido</p>
            <h2>
                <span className="wrap hero_text _neon  ">
                    NFT MarketPlace</span>
            </h2>
          </div>
      </section>
      </hero>
            
            return (
            <div className="container mx-auto flex w-screen h-full flex-col flex-wrap">
                <h1 className="text-white px-4 font-bold text-4xl mx-auto mb-[25px]">Listed Documents</h1>
                <div className="flex flex-wrap mx-[93px]">

                {fetchingListedNfts ? <div>Loading...</div> : ListedNfts.map((nft) => {
                    console.log(nft.attributes)
                    const { price, nftAddress, tokenId, marketplaceAddress, seller } = nft.attributes
                    return (
                        <div className="">
                            <NFTBox 
                                price={price}
                                tokenId={tokenId}
                                nftAddress={nftAddress}
                                marketplaceAddress={marketplaceAddress}
                                seller={seller}
                                key={`${nftAddress}${tokenId}`}
                            />
                        </div>
                    )
                } ) } 
                </div>
            </div>
                
            ) 
            </div>
            <Footer/>
        </>
    )
} 