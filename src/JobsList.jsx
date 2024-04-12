import './JobsList.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import JobCardList from "./JobCardList";
import LoadingSpinner from './LoadingSpinner';
import PageNav from './PageNav';

/** JobsList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - jobs: array of job objects
 *  [ { id, title, salary, equity, companyHandle, companyName }, ...]
 * - currentPage
 *
 * RoutesList -> JobsList -> {JobCardList, LoadingSpinner, SearchForm}
 */

function JobsList() {
    const [jobs, setJobs] = useState({
        data: null,
        searched: "",
    });
    const [currentPage, setCurrentPage] = useState(1);

    const jobsPerPage = 10;

    useEffect(function fetchJobsWhenMounted() {
        search(jobs.searched);
    }, []);

    /** handles search for jobs that match search term */
    async function search(searchTerm) {
        const params = searchTerm === ""
            ? {}
            : { title: searchTerm };

        const jobs = await JoblyApi.getJobs(params);
        setJobs({
            data: jobs,
            searched: searchTerm,
        });
    }

    /** handles page navigation */
    function handlePageNav(page) {
        setCurrentPage(page);
    }

    if (!jobs.data) return <LoadingSpinner />;

    // to handle pagination; grabbing only the needed amount of jobs
    const lastIdx = currentPage * jobsPerPage;
    const firstIdx = lastIdx - (jobsPerPage - 1);
    const jobsOnPage = jobs.data.slice(firstIdx, lastIdx + 1);

    return (
        <div className='JobsList col-md-6 offset-md-3'>
            <SearchForm handleSearch={search} />
            {jobs.searched
                ? <h1>{`Search Results for '${jobs.searched}'`}</h1>
                : <h1>All Jobs</h1>}
            <JobCardList jobs={jobsOnPage} />
            <PageNav
                totalItems={jobs.data.length}
                itemsPerPage={jobsPerPage}
                currentPage={currentPage}
                handlePageNav={handlePageNav} />
        </div>
    );
}

export default JobsList;