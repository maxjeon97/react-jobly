import './CompaniesList.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import CompanyCardList from "./CompanyCardList";
import LoadingSpinner from './LoadingSpinner';
import PageNav from './PageNav';

/** CompaniesList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - companies: array of company objects
 * - currentPage
 *
 * RoutesList -> CompaniesList -> {CompanyCardList, LoadingSpinner, SearchForm}
 */

function CompaniesList() {
    const [companies, setCompanies] = useState({
        data: null,
        searched: "",
    });
    const [currentPage, setCurrentPage] = useState(1);

    const companiesPerPage = 10;

    useEffect(function fetchCompaniesWhenMounted() {
        search(companies.searched);
    }, []);

    /** handles search for companies that match search term */
    async function search(searchTerm) {
        const params = searchTerm === ""
            ? {}
            : { nameLike: searchTerm };

        const companies = await JoblyApi.getCompanies(params);
        setCompanies({
            data: companies,
            searched: searchTerm,
        });
    }

    /** handles page navigation */
    function handlePageNav(page) {
        setCurrentPage(page);
    }

    if (!companies.data) return <LoadingSpinner />;

    // to handle pagination; grabbing only the needed amount of jobs
    const lastIdx = currentPage * companiesPerPage;
    const firstIdx = lastIdx - (companiesPerPage - 1);
    const companiesOnPage = companies.data.slice(firstIdx, lastIdx + 1);

    return (
        <div className='CompaniesList col-md-6 offset-md-3'>
            <SearchForm handleSearch={search} />
            {companies.searched
                ? <h1>{`Search Results for '${companies.searched}'`}</h1>
                : <h1>All Companies</h1>}
            <CompanyCardList companies={companiesOnPage} />
            <PageNav
                totalItems={companies.data.length}
                itemsPerPage={companiesPerPage}
                currentPage={currentPage}
                handlePageNav={handlePageNav} />
        </div>
    );
}

export default CompaniesList;