import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import query from "../../../backend/database/query/query.json";
import mapper from "../../../backend/database/mapper/mapper.json";

interface MainContainerProps {
  showQueryType: boolean;
  queryType: string;
}

interface MergedData {
  title: string;
  percentage: string;
  image: string;
}

const MainContainer: React.FC<MainContainerProps> = ({ showQueryType, queryType}) => {
  const [mergedData, setMergedData] = useState<MergedData[]>([]);
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    let combinedData: MergedData[] = []; // Declare combinedData here
        // Fetch images from your API
        fetch("http://127.0.0.1:8000/images")  // Your API endpoint
            .then((res) => res.json())
            .then((data) => setImages(data))
            .catch((err) => console.error("Error fetching images:", err));

    if (!showQueryType) {
      // Default case: If type is false
        combinedData = mapper.map((item): MergedData => {
        const image = images.find((img) => img.name === item.pic_name);
        return {
          title: item.title,
          percentage: "0", // Default percentage
          image: image ? `http://localhost:8000${image.url}` : "Image not found",
        };
      });
    } else {
        if(queryType = 'music'){
            combinedData = (query.music as [string, number][]).map(([audioFile, percentage]): MergedData | null => {
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
                return null; // Return null if no match
            }).filter((item) => item !== null) as MergedData[];
        }
        
        else if (queryType = 'album'){
            combinedData = (query.music as [string, number][]).map(([audioFile, percentage]): MergedData | null => {
            const percentageItem = mapper.find((p) => p.audio_file === audioFile);
            if (percentageItem) {
                const image = images.find((img) => img.name === percentageItem.pic_name);
                return {
                    title: percentageItem.title,
                    percentage: percentage.toString(),
                    image: image ? `http://localhost:8000${image.url}` : "Image not found",                    };
                }
                return null; // Return null if no match
            }).filter((item) => item !== null) as MergedData[];
        }
            
    }

    // Update state with the combined data
    setMergedData(combinedData);
  }, [showQueryType, queryType, images]);

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