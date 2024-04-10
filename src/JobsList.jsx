import './JobsList.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import JobCardList from "./JobCardList";
import LoadingSpinner from './LoadingSpinner';

/** JobsList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - jobs: array of job objects
 *  [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *
 * RoutesList -> JobsList -> JobCardList
 */

function JobsList() {
    const [jobs, setJobs] = useState({
        data: null,
        searched: "",
    });

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

    if (!jobs.data) return <LoadingSpinner />;

    return (
        <div className='JobsList col-md-8 offset-md-2'>
            <SearchForm handleSearch={search} />
            {jobs.searched
                ? <h1>{`Search Results for '${jobs.searched}'`}</h1>
                : <h1>All Jobs</h1>}
            <JobCardList jobs={jobs.data} />
        </div>
    );
}

export default JobsList;