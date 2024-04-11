import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from './Homepage';
import CompaniesList from './CompaniesList';
import JobsList from './JobsList';
import CompanyDetail from './CompanyDetail';
import EditProfileForm from "./EditProfileForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import userContext from "./userContext";
import { useContext } from "react";


/**RouteList component that contains all Routes
 *
 * Props: none
 * State: none
 *
 * App -> RoutesList ->
 *       { Homepage, CompaniesList, JobsList, CompanyDetail, EditProfileForm, SignupForm, LoginForm }
*/

function RoutesList({ login, signup, updateUser }) {
    const { currentUser } = useContext(userContext);

    /** generates JSX for accessible routes when logged in */
    function routesWhenLoggedIn() {
        return (
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/profile' element={<EditProfileForm updateUser={updateUser} />} />
                <Route path='/companies' element={<CompaniesList />} />
                <Route path='/jobs' element={<JobsList />} />
                <Route path='/companies/:handle' element={<CompanyDetail />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        );
    }

    /** generates JSX for accessible routes when NOT logged in */
    function routesWhenAnon() {
        return (
            <Routes>
                <Route path='/login' element={<LoginForm login={login} />} />
                <Route path='/signup' element={<SignupForm signup={signup} />} />
                <Route path='/' element={<Homepage />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        );
    }

    return (
        <div className="RoutesList">
            {currentUser ? routesWhenLoggedIn() : routesWhenAnon()}
        </div>
    );
}

export default RoutesList;