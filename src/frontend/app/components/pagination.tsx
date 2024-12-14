import { useState } from "react";
import AudioBox from "./audioBox";

interface PaginationProperties {
    items: any[]; //list of items to paginate
    itemsPerPage: number; //num of item per page
}

const Pagination: React.FC<PaginationProperties> = ({items, itemsPerPage}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    //calculating number of needed for pagination
    const totalPages = Math.ceil(items.length / itemsPerPage);

    //get items for current page
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIdx, startIdx + itemsPerPage);

    //handle page
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    return (
        <div>
             {/* Render paginated items */}
            <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border">
                {currentItems.map((item, index) =>(
                    <AudioBox key = {item.id} title={item.title} percentage={item.percentage} image={item.image}/>
                ))}
            </div>
            {/*Render pagination control*/}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage-1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-l-lg hover:bg-gray-400"
                >
                    Prev
                </button>
                
                {Array.from({length: totalPages}, (_,index) => index+1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-yellow-25 text-blue-25' : 'bg-gray-200'} hover:bg-orange-400`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage+1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-r-lg hover:bg-gray-400"    
                >
                    Next
                </button>                
            </div>
        </div>
    );
};

export default Pagination;