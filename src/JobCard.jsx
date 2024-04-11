import './JobCard.css';
import { useContext, useState } from 'react';
import userContext from './userContext';

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
    const { hasAppliedToJob, applyToJob } = useContext(userContext);

    /** handles apply button click */
    async function handleApply(evt) {
        await applyToJob(job.id);
    }

    return (
        <div className='JobCard card'>
            <div className='JobCard-body'>
                <h5 className='JobCard-title'>
                    {job.title}
                </h5>
                <p>{job.companyName}</p>
                <p>Salary: ${job.salary}</p>
                <p>Equity: {job.equity}</p>
                {hasAppliedToJob(job.id)
                    ? <button
                        disabled
                        className='JobCard-apply
                        btn btn-danger
                        fw-bold text-uppercase float-end'>Applied</button>
                    : <button
                        className='JobCard-apply
                        btn btn-danger
                        text-uppercase float-end'
                        onClick={handleApply}>Apply</button>}
            </div>
        </div >
    );
}

export default JobCard;