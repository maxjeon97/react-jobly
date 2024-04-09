import './CompaniesList.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import CompanyCardList from "./CompanyCardList";

/** CompaniesList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - companies: array of company objects
 *
 * RoutesList -> CompaniesList -> CompanyCardList
 */

function CompaniesList() {
    const [companies, setCompanies] = useState({
        data: null,
        isLoading: true,
        searched: "",
    });

    useEffect(function fetchCompaniesWhenMounted() {
        // async function fetchCompanies() {
        //     const companies = await JoblyApi.getCompanies();
        //     setCompanies(
        //         {
        //             isLoading: false,
        //             data: companies,
        //             searched: ""
        //         }
        //     );
        // }
        // fetchCompanies();
        handleSearch(companies.searched);
    }, []);

    /** handles search for companies that match search term */
    async function handleSearch(searchTerm) {
        const params = searchTerm === ""
            ? {}
            : { nameLike: searchTerm };

        const companies = await JoblyApi.getCompanies(params);
        setCompanies({
            data: companies,
            isLoading: false,
            searched: searchTerm
        });
    }

    if (companies.isLoading) return <h1>Loading....</h1>;

    return (
        <div className='CompaniesList'>
            <SearchForm handleSearch={handleSearch} />
            {companies.searched
                ? <h1>{`Search Results for '${companies.searched}'`}</h1>
                : <h1>All Companies</h1>}
            <CompanyCardList companies={companies.data} />
        </div>
    );
}

export default CompaniesList;