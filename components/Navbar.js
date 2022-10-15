import React from 'react'
import { ConnectButton } from "@web3uikit/web3"


function Navbar () {
    return ( 
      <div className="navbar navbar-expand-lg bg-black mt-0">
        
      <div className="container-fluid flex justify-center w-screen  ">
      
        <a href="./home">Home</a>
        <a href="./fileupload">Mint NFT</a>
        <a href="./market">NFT Market</a>
        <a href="./sell">Profile</a>  
        <div className=' right-0'>
        <ConnectButton moralisAuth={true} />  
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </div>
    )
}

export default Navbar