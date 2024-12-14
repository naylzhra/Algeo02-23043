"use client";

import React from "react";
import SideBar from "./sidebar";
import { useRouter } from "next/navigation";
import Navbar from "./navbar";
import MainContainer from "./maincontainer";

export default function MusicRetrieval(){
    const router = useRouter()
    return(
        <div className="flex flex-col">
            <Navbar/>
            {/*Body*/}
            <div className="grid grid-cols-5 gap-8 ml-7 mr-7 mt-10">
                {/*Side Bar*/}
                <SideBar/>
                {/*Main Page Bar*/}
                <div className="border col-span-4">
                    <MainContainer/>
                </div>
            </div>
        </div>
        
    )
}