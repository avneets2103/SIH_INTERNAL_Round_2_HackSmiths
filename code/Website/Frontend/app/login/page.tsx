"use client"
import React from 'react'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import './page.css'
import LoginCard from '@/my_components/loginCard/loginCard'
import DemoCard from '@/my_components/loginCard/demoCard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios'
import {useEffect} from 'react'
import { BACKEND_URI } from '@/CONSTANTS'
import Cookies from "js-cookie";
import { tokenCookies } from '@/Helpers/cookieHandling'

function Page() {
    const Router = useRouter();
    useEffect(()=>{
        const checkTokens = async ()=>{
            try {
              // Verify access token
              const accessTokenResponse = await axios.post(`${BACKEND_URI}/users/verifyAccessToken`);
              if (accessTokenResponse.status === 200) {
                Router.push('/sections/myCart');
                return;
              }
            } catch (error) {
              console.log('Access token invalid, trying refresh token...');
            }
      
            try {
              // Refresh access token
              const refreshTokenResponse = await axios.post(`${BACKEND_URI}/users/refreshAccessToken`, {
                refreshToken: Cookies.get("refreshToken")
              });
              if (refreshTokenResponse.status === 200) {
                tokenCookies(refreshTokenResponse.data.data.accessToken, refreshTokenResponse.data.data.refreshToken);
                Router.push('/sections/myCart');
                return;
              }
            } catch (error) {
              console.log('Refresh token invalid.');
            }
        };
        // checkTokens();
    }, [Router])

    return (
        <>
        <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
        <div>
          {/* #682084 rgb(104, 32, 132)  purple*/}
          {/* #2c2c84 rgb(44, 44, 132) blue */}
          {/* #0f1218 rgb(15, 18, 24) black */}
          {/* #f46dc9 rgb(244, 109, 201) pink */}
            <div className='w-full h-screen z-0 absolute top-0 left-0'>
                <BackgroundGradientAnimation 
                gradientBackgroundStart="rgb(44, 44, 132)" 
                gradientBackgroundEnd="rgb(104, 32, 132)"
                firstColor="104, 32, 132" 
                secondColor='244, 109, 201'
                thirdColor='104, 32, 132'
                fourthColor='255, 255 ,255'
                fifthColor='104, 32, 132'
                pointerColor='244, 109, 201'
                />                
            </div>
            <div 
            className='
            w-full 
            h-screen 
            flex 
            justify-center 
            items-center 
            z-1 
            absolute 
            top-0 
            left-0
            '>
                <div 
                  className="
                  relative
                  loginGlass
                  z-0
                  bg-color2
                  w-10/12 h-5/6  
                  rounded-[20px] 
                  shadow-ourBoxShadow
                  flex
                  items-center
                  justify-between
                  px-[5rem]
                  "
                >
                    <LoginCard />
                    <DemoCard/>
                    <img src="./icons/Image.svg" alt="questionMark" className='m-[-1rem] min-w-40 w-[25%] hide-on-small'/>                
                </div> 
            </div>
        </div>
        </>
    )
}

export default Page
