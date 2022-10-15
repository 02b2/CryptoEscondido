import { Modal, Input, useNotification } from "web3uikit"
import { useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import {abi, contractAddress } from "../pages/constants/index"
import { ethers } from "ethers"

export default function UpdateListingModal({
    nftAddress,
    tokenId,
    isVisible,
    onClose,
}) {
    const dispatch = useNotification()

    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)
    const {Moralis} = useMoralis()

    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
        },
    })

    async function callWeb3() {
        await Moralis.enableWeb3()
        await updateListing()
        onClose()
        dispatch({
            type: "success",
            message: "Listing Updated.  Please wait, then refresh.",
            position: "topR",
        })
    }

    return (
        <Modal
            isVisible={isVisible}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={callWeb3}
        >
            <Input
                label="Update listing price in L1 Currency (ETH)"
                name="New listing price"
                type="number"
                onChange={(event) => {
                    setPriceToUpdateListingWith(event.target.value)
                }}
            />
        </Modal>
    )
}