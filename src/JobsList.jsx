import './JobsList.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import SearchForm from './SearchForm';
import JobCardList from "./JobCardList";

/** JobsList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - jobs: array of job objects
 *
 * RoutesList -> JobsList -> JobCardList
 */

function JobsList() {
    const [jobs, setJobs] = useState({
        data: null,
        isLoading: true,
        searched: ""
    });

    useEffect(function fetchJobsWhenMounted() {
        // async function fetchJobs() {
        //     const jobs = await JoblyApi.getJobs();
        //     setJobs(
        //         {
        //             isLoading: false,
        //             data: jobs,
        //             searched: ""
        //         }
        //     );
        // }
        // fetchJobs();
        handleSearch(jobs.searched);
    }, []);

    /** handles search for jobs that match search term */
    async function handleSearch(searchTerm) {
        const params = { title: searchTerm };
        const jobs = await JoblyApi.getJobs(params);
        setJobs({
            data: jobs,
            isLoading: false,
            searched: searchTerm
        });
    }

    if (jobs.isLoading) return <h1>Loading....</h1>;

    return (
        <div className='JobsList'>
            <SearchForm handleSearch={handleSearch} />
            {jobs.searched
                ? <h1>{`Search Results for '${jobs.searched}'`}</h1>
                : <h1>All Jobs</h1>}
            <JobCardList jobs={jobs.data} />
        </div>
    );
}

export default JobsList;