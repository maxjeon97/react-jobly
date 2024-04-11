import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from './Homepage';
import CompaniesList from './CompaniesList';
import JobsList from './JobsList';
import CompanyDetail from './CompanyDetail';
import EditProfileForm from "./EditProfileForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


/**RouteList component that contains all Routes
 *
 * Props: none
 * State: none
 *
 * App -> RoutesList -> { Homepage, CompaniesList, JobsList, CompanyDetail }
*/

function RoutesList({ login, signup, updateUser }) {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/companies' element={<CompaniesList />} />
            <Route path='/jobs' element={<JobsList />} />
            <Route path='/companies/:handle' element={<CompanyDetail />} />
            <Route path='/profile' element={<EditProfileForm updateUser={updateUser} />} />
            <Route path='/login' element={<LoginForm login={login}/>} />
            <Route path='/signup' element={<SignupForm signup={signup}/>} />
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
}

export default RoutesList;