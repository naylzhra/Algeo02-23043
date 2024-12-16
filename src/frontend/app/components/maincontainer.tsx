import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import query from "../../../backend/database/query/query.json";
import mapper from "../../../backend/database/mapper/mapper.json";
import Image from 'next/image';


interface MergedData {
    title: string;
    percentage: string;
    image: string;
}

const MainContainer: React.FC = () => {
    const [mergedData, setMergedData] = useState<MergedData[]>([]);
    const [images, setImages] = useState<{ name: string; url: string }[]>([]);

    useEffect(() => {
        // Fetch images from your API
        fetch("http://127.0.0.1:8000/images")  // Your API endpoint
            .then((res) => res.json())
            .then((data) => setImages(data))
            .catch((err) => console.error("Error fetching images:", err));

        // Combine data from `query` and `mapper`
        const combinedData = (query.music as [string, number][]).map(([audioFile, percentage]): MergedData => {
            const percentageItem = mapper.find((p) => p.audio_file === audioFile);

            if (percentageItem) {
                // Find the corresponding image URL based on `pic_name`
                const image = images.find((img) => img.name === percentageItem.pic_name);

                return {
                    title: percentageItem.title,
                    percentage: percentage.toString(),
                    image: image ? `http://localhost:8000${image.url}` : "Image not found", 
                };
            }

            return {
                title: "Title not found.",
                percentage: "0",
                image: "Image not found.",
            };
        }).filter(item => item !== null) as MergedData[];

        setMergedData(combinedData);
    }, [images]);

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