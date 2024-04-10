import './JobCardList.css';
import JobCard from "./JobCard";

/** JobCardList component for Jobly.
 *
 * Props:
 * - jobs:
 * [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *
 * State: none
 *
 * {JobsList, CompanyDetail} -> JobCardList -> JobCard
 */

function JobCardList({ jobs }) {
    return (
        <div className='JobCardList'>
            {jobs.length === 0 &&
                <p className='JobCardList-404'>Sorry, no results were found!</p>}
            {jobs.map(j => <JobCard key={j.id} job={j} />)}
        </div>
    );
}

export default JobCardList;