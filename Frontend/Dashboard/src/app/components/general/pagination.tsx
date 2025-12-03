import React from 'react';

interface PaginationProps {
    items: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ items, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(items / pageSize);

    if (pagesCount === 1) return null;

    const pages = [];
    const maxPagesToShow = 7;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
    let endPage = Math.min(pagesCount, currentPage + halfMaxPagesToShow);

    if (currentPage - halfMaxPagesToShow <= 0) {
        endPage = Math.min(pagesCount, maxPagesToShow);
    }

    if (currentPage + halfMaxPagesToShow > pagesCount) {
        startPage = Math.max(1, pagesCount - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div>
            <ul className='w-full flex gap-2 justify-center items-center list-none'>
                {pagesCount > maxPagesToShow &&
                    <li onClick={() => onPageChange(1)}
                        className={`flex justify-center items-center w-10 h-8 cursor-pointer hover:underline rounded-lg ${1 === currentPage ? 'bg-secondary text-white' : ''}`}>
                        1
                    </li>
                }
                {pagesCount > maxPagesToShow && "..."}
                {pages.map(page => (
                    <li key={page} onClick={() => onPageChange(page)}
                        className={`flex justify-center items-center w-10 h-8 cursor-pointer hover:underline rounded-lg ${page === currentPage ? 'bg-secondary text-white' : ''}`}>
                        {page}
                    </li>
                ))}
                {pagesCount > maxPagesToShow && "..."}
                {pagesCount > maxPagesToShow &&
                    <li onClick={() => onPageChange(pagesCount)}
                        className={`flex justify-center items-center w-10 h-8 cursor-pointer hover:underline rounded-lg ${pagesCount === currentPage ? 'bg-secondary text-white' : ''}`}>
                        {pagesCount}
                    </li>
                }
            </ul>
        </div>
    );
};

export const paginate = (items: any[], pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
};

export default Pagination;
