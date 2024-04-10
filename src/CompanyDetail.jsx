import './CompanyDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCardList from './JobCardList';
import LoadingSpinner from './LoadingSpinner';

/** CompanyDetail component for Jobly.
 *
 * Props: none
 *
 * State:
 * - company: singular company object associated with company handle from URL
 *
 * RoutesList -> CompanyDetail -> JobCardList
 */

function CompanyDetail() {
    const [company, setCompany] = useState({
        data: null,
    });

    const { handle } = useParams();

    useEffect(function fetchCompanyWhenMounted() {
        async function fetchCompany() {
            const company = await JoblyApi.getCompany(handle);
            setCompany(
                {
                    data: company,
                }
            );
        }
        fetchCompany();
    }, []);

    // TODO: add loading spinner component
    if (!company.data) return <LoadingSpinner />;

    return (
        <div className='CompanyDetail col-md-8 offset-md-2'>
            <h2>{company.data.name}</h2>
            <p>{company.data.description}</p>
            <JobCardList jobs={company.data.jobs} />
        </div>
    );
}

export default CompanyDetail;