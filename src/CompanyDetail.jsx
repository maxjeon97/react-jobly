import './CompanyDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCardList from './JobCardList';
import LoadingSpinner from './LoadingSpinner';
import Alert from './Alert';
import PageNav from './PageNav';

/** CompanyDetail component for Jobly.
 *
 * Props: none
 *
 * State:
 * - company: singular company object associated with company handle from UR
 * - errors
 * - currentPage
 *
 * RoutesList -> CompanyDetail -> {JobCardList, LoadingSpinner, Alert}
 */

function CompanyDetail() {
    const [company, setCompany] = useState({
        data: null,
    });
    const [errors, setErrors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const jobsPerPage = 10;

    const { handle } = useParams();

    useEffect(function fetchCompanyWhenMounted() {
        async function fetchCompany() {
            try {
                const company = await JoblyApi.getCompany(handle);
                setCompany(
                    {
                        data: company,
                    }
                );
            }
            catch (err) {
                setErrors([...err])
            }
        }
        fetchCompany();
    }, []);

    /** handles page navigation */
    function handlePageNav(page) {
        setCurrentPage(page);
    }

    if (errors.length > 0 ) {
        return <Alert messages={errors} type="danger" />;
    }

    if (!company.data) return <LoadingSpinner />;

    // to handle pagination; grabbing only the needed amount of jobs
    const lastIdx = currentPage * jobsPerPage;
    const firstIdx = lastIdx - (jobsPerPage - 1);
    const jobsOnPage = company.data.jobs.slice(firstIdx, lastIdx + 1);

    return (
        <div className='CompanyDetail col-md-6 offset-md-3'>
            <h2>{company.data.name}</h2>
            <p>{company.data.description}</p>
            <JobCardList jobs={jobsOnPage} />
            <PageNav
                totalItems={company.data.jobs.length}
                itemsPerPage={jobsPerPage}
                currentPage={currentPage}
                handlePageNav={handlePageNav} />
        </div>
    );
}

export default CompanyDetail;