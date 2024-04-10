import './JobCardList.css';
import JobCard from "./JobCard";
import SearchNotFound from "./SearchNotFound";

/** JobCardList component for Jobly.
 *
 * Props:
 * - jobs:
 * [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *
 * State: none
 *
 * {JobsList, CompanyDetail} -> JobCardList -> {SearchNotFound, JobCard}
 */


function JobCardList({ jobs }) {
    return (
        <div className='JobCardList'>
            {jobs.length === 0 &&
                <SearchNotFound />}
            {jobs.map(j => <JobCard key={j.id} job={j} />)}
        </div>
    );
}

export default JobCardList;