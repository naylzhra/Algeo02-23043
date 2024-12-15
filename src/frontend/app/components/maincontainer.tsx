import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import query from "../../../backend/database/query/query.json";
import mapper from "../../../backend/database/mapper/mapper.json"

interface MergedData {
    title: string;
    percentage: string;
    image: string;
}

const MainContainer: React.FC = () => {
    const [mergedData, setMergedData] = useState<MergedData[]>([]);
    useEffect(() => {
        const combinedData = (query.music as [string, number][]).map(([audioFile, percentage]): MergedData => {
            const percentageItem = mapper.find((p) => p.audio_file === audioFile);

            //combine title, image, percentage
            if (percentageItem) {
                return {
                    title: percentageItem.title,
                    percentage: percentage.toString(),
                    image: percentageItem.pic_name,
                };
            }
            return {
                title: "Title not found.",
                percentage: "0",
                image: "Image not found."
            } ;
        }).filter(item => item !== null) as MergedData[];
        
        setMergedData(combinedData);
    }, []);

    return (
        <div className="pb-4">
            <div className="text-center text-white-25 font-semibold border justify-items-stretch">
                <div className="border">Query Result</div>
                <div className="grid grid-cols-2">
                    <div className=""> {/*API here buat load time slth loadDatabase*/}
                        Load Time : 
                    </div>
                    <div>
                        Query Time :
                    </div>
                </div>
            </div>
            <Pagination items={mergedData} itemsPerPage={12}/>
        </div>
    );
};

export default MainContainer;