import React, { useState, useEffect } from "react";
import Pagination from "./pagination";

interface MainContainerProps {
  showQueryType: number;
  queryType: string;
}

interface MergedData {
  title: string;
  percentage: string;
  image: string;
}

const MainContainer: React.FC<MainContainerProps> = ({ showQueryType, queryType }) => {
  const [mergedData, setMergedData] = useState<MergedData[]>([]);

  console.log('useEffect triggered:', showQueryType, queryType);

  const fetchQueryData = async () => {
    try {
      const query = await fetch(`http://localhost:8000/queryResult`);
      return query; // Ensure .default is used for ES Module
    } catch (err) {
      console.error("Error loading query data:", err);
      return null;
    }
  };

  const fetchMapperData = async () => {
    try {
      const mapper = await fetch(`http://localhost:8000/mapperData`);
      return mapper; // Ensure .default is used for ES Module
    } catch (err) {
      console.error("Error loading mapper data:", err);
      return null;
    }
  };

  useEffect(() => {
    
    const fetchDataAndCombine = async () => {

      try {
        // Fetch images

        const response = await fetch("http://127.0.0.1:8000/images");
        const images = await response.json();


        // Initialize combined data
        let combinedData: MergedData[] = [];

        if (showQueryType <0) {
          return;
        } 
        else if (showQueryType === 0){
          // Default case: If database loaded but query isn't
          const mapperData = await fetchMapperData();
          if (mapperData?.ok){
            const mapper = await mapperData.json();
            combinedData = mapper.map((item: any) => {
              const image = images.find((img: any) => img.name === item.pic_name);
              return {
                title: item.title,
                percentage: "0", // Default percentage
                image: image ? `http://localhost:8000${image.url}` : "Image not found",
              };
            });
          }
        } 
        else if (queryType === "music" || queryType === "album") {
          console.log("masuk")
          // Dynamically fetch query data
          const mapperData = await fetchMapperData();
          if (mapperData?.ok){
            const mapper = await mapperData.json();
            console.log(mapper)
            const queryData = await fetchQueryData();
            if (queryData?.ok){
              console.log("query data ok")
              const query = await queryData.json();
              if (queryData && queryType === "music") {
                  combinedData = (query.result as [string, number][]).map(([audioFile, percentage]) => {
                  const percentageItem = mapper.find((p: any) => p.audio_file === audioFile);

                  if (percentageItem) {
                      const image = images.find((img: any) => img.name === percentageItem.pic_name);
                      return {
                      title: percentageItem.title,
                      percentage: percentage.toString(),
                      image: image ? `http://localhost:8000${image.url}` : "Image not found",
                      };
                    }
                    return null; // Return null if no match
                }).filter((item) => item !== null) as MergedData[];
              } else if (queryData && queryType === "album"){
                combinedData = (query.result as [string, number][]).map(([imageFile, percentage]) => {
                  const percentageItem = mapper.find((p: any) => p.pic_name === imageFile);

                  if (percentageItem) {
                    const image = images.find((img: any) => img.name === percentageItem.pic_name);
                    return {
                    title: percentageItem.title,
                    percentage: percentage.toString(),
                    image: image ? `http://localhost:8000${image.url}` : "Image not found",
                    };
                  }
                  return null; // Return null if no match
                }).filter((item) => item !== null) as MergedData[];
              }
            }
          }
        }

        // Update merged data state
        setMergedData(combinedData);
      } catch (error) {
        console.error("Error fetching or combining data:", error);
      }
    };

    fetchDataAndCombine();
  }, [showQueryType, queryType]); // Re-run only if these props change

  console.log(mergedData);

  return (
    <div className="pb-4">
      <div className="text-center text-white-25 font-semibold justify-items-stretch mb-4">
        <div>
          Result: <span className="text-yellow-25 font-bold">{mergedData.length}</span> Data
        </div>
      </div>
      <Pagination items={mergedData} itemsPerPage={12} />
    </div>
  );
};

export default MainContainer;