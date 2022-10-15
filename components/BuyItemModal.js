import { Modal, useNotification } from "web3uikit"
import { useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import {abi, contractAddress } from "../pages/constants/index"

export default function BuyItemModal({nftAddress, tokenId, price, onClose, isVisible}) {

    const dispatch = useNotification()
    const { Moralis } = useMoralis()

    const {runContractFunction: buyItem} = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nftAddress: contractAddress,
            tokenId: tokenId,
        }
    
    })

    async function callWeb3() {
        await Moralis.enableWeb3()
        await buyItem()
        onClose()
        dispatch({
            type: "success",
            message: "Item Purchased!  Please wait, then refresh.",
            position: "topR",
        })
    }

    return (
        <Modal
            isVisible={isVisible}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={callWeb3}
        >Would you like to buy this document?</Modal>
        )
    

}