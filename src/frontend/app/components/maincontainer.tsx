import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import dummy from "../../../backend/res_dummy.json";
import mapper from "../../../backend/mapper.json"

interface MergedData {
    title: string;
    percentage: string;
    image: string;
}

const MainContainer: React.FC = () => {
    const [mergedData, setMergedData] = useState<MergedData[]>([]);
    useEffect(() => {
        const combinedData = mapper.map((mapperItem) => {
            const percentageItem = dummy.find((p) => p.audio === mapperItem.audio);

            //combine title, image, percentage
            if (percentageItem) {
                return {
                    title: mapperItem.title,
                    percentage: percentageItem.percentage,
                    image: mapperItem.image,
                };
            }
            return null;
        }).filter(item => item !== null) as MergedData[];
        
        setMergedData(combinedData);
    }, []);

    return (
        <div className="pb-4">
            <p className="text-center text-white-25 font-semibold border">Query Result</p>
            <Pagination items={mergedData} itemsPerPage={12}/>
        </div>
    );
};

export default MainContainer;