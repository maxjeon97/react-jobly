import React from "react";
import { Link } from 'react-router-dom';
import './PageNav.css';

/** Pagination Nav component for Jobly
 *
 * props:
 * - totalItems
 * - itemsPerPage
 * - currentPage
 * - handlePageNav()
 *
 * state: none
*/

function PageNav({ totalItems, itemsPerPage = 10, currentPage, handlePageNav }) {
    const numPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [];

    // create an array that has the page numbers from 1 to numPages
    for (let i = 1; i <= numPages; i++) {
        pages.push(i);
    }

    return (
        <nav className="PageNav" aria-label="PageNavigation">
            <ul className="pagination">
                <li className="page-item">
                    <Link
                        className={`page-link
                        ${currentPage === 1
                                ? 'disabled'
                                : ''}`}
                        onClick={() => handlePageNav(currentPage - 1)}>
                        Previous
                    </Link>
                </li>
                {pages.map((page) =>
                    <li className={`page-item
                    ${currentPage === page ? 'active' : ''}`}
                        key={page}>
                        <Link
                            className="page-link"
                            onClick={() => handlePageNav(page)}>
                            {page}
                        </Link>
                    </li>)}
                <li className="page-item">
                    <Link
                        className={`page-link
                        ${currentPage === pages[pages.length - 1]
                                ? 'disabled'
                                : ''}`}
                        onClick={() => handlePageNav(currentPage + 1)}>
                        Next
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;