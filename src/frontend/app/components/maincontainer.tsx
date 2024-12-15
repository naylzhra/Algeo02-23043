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