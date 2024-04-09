import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from './Homepage';
import CompaniesList from './CompaniesList';
// import JobsList from './JobsList';
// import CompanyDetail from './CompanyDetail';


/**RouteList component that contains all Routes
 *
 * Props: none
 * State: none
 *
 * App -> RoutesList -> { Homepage, CompaniesList, JobsList, CompanyDetail }
*/

function RoutesList() {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/companies' element={<CompaniesList />} />
            {/* <Route path='/jobs' element={<JobsList />} />
            <Route path='/companies/:handle' element={<CompanyDetail />} /> */}
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
}

export default RoutesList;