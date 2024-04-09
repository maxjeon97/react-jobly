import './Homepage.css';

/** Homepage for Jobly.
 *
 * Props: none
 *
 * State: none
 *
 * App -> RoutesList -> Homepage
 */

function Homepage() {
    return (
        <div className='Homepage'>
            <h1 className='Homepage-title'>Jobly</h1>
            <p className='Homepage-welcome'>
                All the jobs in one, convenient place
            </p>
        </div>
    );
}

export default Homepage;