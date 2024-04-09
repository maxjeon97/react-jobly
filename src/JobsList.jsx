import './JobsList.css';

/** JobsList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - jobs: array of job objects
 *
 * App -> RoutesList -> JobsList
 */

function JobsList() {
    return (
        <div className='JobsList'>
            <h1 className='JobsList-title'>Jobly</h1>
            <p className='JobsList-welcome'>
                All the jobs in one, convenient place
            </p>
        </div>
    );
}

export default JobsList;