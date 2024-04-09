import './CompaniesList.css';

/** CompaniesList component for Jobly.
 *
 * Props: none
 *
 * State:
 * - companies: array of company objects
 *
 * App -> RoutesList -> CompaniesList
 */

function CompaniesList() {
    return (
        <div className='CompaniesList'>
            <h1 className='Homepage-title'>Jobly</h1>
            <p className='Homepage-welcome'>
                All the jobs in one, convenient place
            </p>
        </div>
    );
}

export default CompaniesList;