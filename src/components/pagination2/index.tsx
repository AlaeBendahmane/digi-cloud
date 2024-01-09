import React from 'react';
import Prev from "../../assets/icons/prev.svg";
import Next from "../../assets/icons/next.svg";
interface CustomPaginationProps {
    totalRows: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
const CustomMaterialPagination: React.FC<CustomPaginationProps> = ({
    currentPage,
    totalRows,
    onPageChange,
}) => {
    const rowsPerPage = 9;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const handlePageClick = (page: number) => {
        if (page >= 0 && page < totalPages) {
            onPageChange(page);
        }
    };
    return (
        <nav aria-label="Page navigation example " className='mt-2 ml-auto'>
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        style={{ display: totalRows === 0 ? 'none' : 'block' }}
                        disabled={currentPage === 0}
                        className="flex items-center justify-center px-3 h-8"
                    >
                        <img src={Prev} alt="Prev" />
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index}>
                        <button
                            onClick={() => handlePageClick(index)}
                            className={`flex items-center justify-center px-3 mx-0.5 h-8 leading-tight ${currentPage === index
                                ? 'text-red-700 rounded-md bg-white shadow-xl'
                                : 'text-gray-900 rounded-md bg-white  hover:shadow-xl hover:text-red-700'
                                }`}>
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        style={{ display: totalRows === 0 ? 'none' : 'block' }}
                        className="flex items-center justify-center px-3 h-8">
                        <img src={Next} alt="Next" />
                    </button>
                </li>
            </ul>
        </nav>
    );
};
export default CustomMaterialPagination;