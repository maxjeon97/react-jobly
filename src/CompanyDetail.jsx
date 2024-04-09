import './CompanyDetail.css';

/** CompanyDetail component for Jobly.
 *
 * Props: none
 *
 * State:
 * - company: singular company object associated with company handle from URL
 *
 * App -> RoutesList -> CompanyDetail
 */

function CompanyDetail() {
    return (
        <div className='CompanyDetail'>
            <h1 className='Homepage-title'>Jobly</h1>
            <p className='Homepage-welcome'>
                All the jobs in one, convenient place
            </p>
        </div>
    );
}

export default CompanyDetail;