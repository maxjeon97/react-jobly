import './CompanyDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';

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
        isLoading: true,
    });

    const { handle } = useParams();

    useEffect(function fetchCompanyWhenMounted() {
        async function fetchCompany() {
            const company = await JoblyApi.getCompany(handle);
            setCompany(
                {
                    data: company,
                    isLoading: false,
                }
            );
        }
        fetchCompany();
    }, []);

    if (company.isLoading) return <h1>Loading....</h1>;

    return (
        <div className='CompanyDetail'>
            <h2>{company.data.name}</h2>
            <p>{company.data.description}</p>
            <JobCardList jobs={company.data.jobs} />
        </div>
    );
}

export default CompanyDetail;