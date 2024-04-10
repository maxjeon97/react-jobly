import './JobCard.css';



/** JobCard component for Jobly.
 *
 * Props:
 * - job: object
 *           {id, title, salary, equity, companyHandle, companyName}
 *
 * State: none
 *
 * JobCardList -> JobCard
 */

function JobCard({ job }) {
    return (
        <div className='JobCard card'>
            <div className='JobCard-body'>
                <h5 className='JobCard-title'>
                    {job.title}
                </h5>
                <p>{job.companyName}</p>
                <p>Salary: ${job.salary}</p>
                <p>Equity: {job.equity}</p>
            </div>
        </div >
    );
}

export default JobCard;