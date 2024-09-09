"use client"
import { setCurrentPage } from '@/RTK/features/sidebar';
import Sidebar from '@/my_components/Individual/sidebar/sidebar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from '@/utils/axios';
import Home from '@/my_components/Home/Home';
import Stats from '@/my_components/Stats/Stats';

function Page({ params }: any) {
    const dispatcher = useDispatch();
    const currentPage = params.pagename;
    useEffect(() => {
        // try {
        //     // Verify access token
        //     const accessTokenResponse = axios.post(`${BACKEND_URI}/users/verifyAccessToken`);
        //   } catch (error) {
        //   }
        // dispatcher(setCurrentPage({currentPage: currentPage}));
    });

    return (
        <div className='w-full h-screen bg-primaryColor flex'>
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
            <Sidebar/>
            { currentPage === "home" && <Home/>}
            { currentPage === "stats" && <Stats/>}
        </div>
    )
}

export default Page
