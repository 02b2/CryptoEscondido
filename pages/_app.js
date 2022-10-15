import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'
import '../styles/globals.css'
import Head from 'next/head'


import React, {useEffect, useState} from 'react';
import {BrowserRouter, RouteProps, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import UAuth from '@uauth/js'

const uauth = new UAuth({
    clientID: "31979fa8-f1c2-41bc-8377-07176c31242e",
    redirectUri: "http://localhost:3000/callback",
    scope: "openidwallet"
});
// const Login; React.FC<RouteProps> = props => { const [errorMessage, setErrorMessage] = useState<string | null>(
//   new URLSearchParams(useLocation().search || '').get('error'),
// )}

  // const handleLoginButtonClick; React.MouseEventHandler<HTMLButtonElement> =
  //   e => {
  //     setErrorMessage(null)
  //     uauth.login().catch(error => {
  //       console.error('login error:', error)
  //       setErrorMessage('User failed to login.')
  //     })
  //   }



function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>CryptoEscondido</title>
        <meta className="CryptoEscondido" content="Web3 Whistleblower Documents" />
        <link rel="icon" href="/favicon.ico" />
        {errorMessage && <div>{errorMessage}</div>}
      <button onClick={handleLoginButtonClick}>Login with Unstoppable</button>
      </Head>
      {/* Moralis Provider needs to wrap our main app and include our server URL as well as App ID */}
      <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_SERVER_URL} appId={process.env.NEXT_PUBLIC_APP_ID}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </MoralisProvider>
  </div>
  )
}

export default MyApp
