import './Homepage.css';
import { useContext } from "react";
import userContext from "./userContext";
import { Link } from "react-router-dom";

/** Homepage for Jobly.
 *
 * Props: none
 *
 * State: none
 *
 * App -> RoutesList -> Homepage
 */

function Homepage() {
    const { currentUser } = useContext(userContext);

    return (
        <div className='Homepage'>
            <div className='Homepage-title-logo'>
                <h1 className='Homepage-title'>Jobly</h1>
                <img className="Homepage-logo"
                    src="/logos/logo-jobly1.png"
                    alt="jobly-logo" />
            </div>
            <p className='Homepage-welcome'>
                Apply to jobs anywhere, at anytime
            </p>
            {currentUser
                ?
                <h3>{`Welcome back, ${currentUser.username}!`}</h3>
                :
                <div className='Homepage-auth'>
                    <Link className="btn btn-primary" to="/login">Login</Link>
                    <Link className="btn btn-primary" to="/signup">Signup</Link>
                </div>}
        </div>
    );
}

export default Homepage;