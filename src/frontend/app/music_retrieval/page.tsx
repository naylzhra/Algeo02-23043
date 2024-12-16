"use client";

import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/navigation";
import MainContainer from "../components/maincontainer";

const MusicRetrieval: React.FC = () => {
	const [showType, setshowType] = useState<number>(-1);
	const [isDatabaseLoaded, setIsDatabaseLoaded] = useState<boolean>(false);
	
	// Callback to handle query result
	const handleQueryResult = async (isStarted: boolean) => {
		if (isDatabaseLoaded && isStarted) {
			setshowType((prev) => prev + 1);
		}
	};
	
	const handleLoadDatabase = async (isLoaded: boolean) => {
		setIsDatabaseLoaded(isLoaded);
		if (isLoaded && showType === -1) {
			setshowType(0);
		}
	};
  	
	const router = useRouter()

	return (
		<div className="flex flex-col">
			<div className="flex flex-row align-middle justify-between mt-3 w-full z-50-b-2 pb-2 border-b-2">
				{/*Left Component*/}
				<div className="flex flex-row gap-5 ml-7"> 
					<button>
						<img 
						onClick={()=>router.push('/')}
						src="\Home 3.svg" alt="" className="w-6 h-6 pb-0.5"/>
					</button>
					<button>
						<img 
						onClick={()=>router.push('/')}
						src="\MuseIc.svg" alt="" className="w-20"/>
					</button>
				</div>
			{/*Right Components*/}
				<div className="flex flex-row align-middle justify-items-center">
					<button 
						onClick={()=>router.push("/music_retrieval")}
						className="button-navbar-off bg-yellow-25">
						<img src="\Music Equalizer.svg" alt="" className="w-5 h-5" />
						<span className="text-white"> Music Retrieval </span>
					</button>
					<button
						onClick={()=>router.push("/album_finder")}
						className="button-navbar-off">
						<img src="\Music Folder Song.svg" alt="" className="w-5 h-5" />
						<span className="text-white"> Album Finder </span>
					</button>
				</div>
			</div>
			{/*Body*/}
			<div className="grid grid-cols-5 gap-8 ml-7 mr-7 mt-10">
				{/*Side Bar*/}
				<Sidebar 
				type="music" 
        		onQueryResult={handleQueryResult}
				onLoadDatabase={handleLoadDatabase}/>
				{/*Main Page Bar*/}
				<div className="col-span-4">
					<MainContainer showQueryType={showType} queryType="music" />
				</div>
			</div>
		</div>
	);
};

export default MusicRetrieval;