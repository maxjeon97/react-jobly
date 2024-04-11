import './CompaniesList.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import CompanyCardList from "./CompanyCardList";
import LoadingSpinner from './LoadingSpinner';

/** CompaniesList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - companies: array of company objects
 *
 * RoutesList -> CompaniesList -> {CompanyCardList, LoadingSpinner, SearchForm}
 */

function CompaniesList() {
    const [companies, setCompanies] = useState({
        data: null,
        searched: "",
    });

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

    if (!companies.data) return <LoadingSpinner />;

    return (
        <div className='CompaniesList col-md-8 offset-md-2'>
            <SearchForm handleSearch={search} />
            {companies.searched
                ? <h1>{`Search Results for '${companies.searched}'`}</h1>
                : <h1>All Companies</h1>}
            <CompanyCardList companies={companies.data} />
        </div>
    );
}

export default CompaniesList;