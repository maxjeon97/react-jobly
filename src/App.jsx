import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import RoutesList from './RoutesList';
import userContext from './userContext';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import { jwtDecode } from 'jwt-decode';
import LoadingSpinner from './LoadingSpinner';

/** Component for entire page.
 *
 * Props: none
 *
 * State:
 * - currentUser
 * - token
 * - isLoaded
 *
 * App -> {Navbar, RoutesList}
*/


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState([]);

  useEffect(function fetchUserOnLoadAndTokenChange() {
    async function fetchUser() {
      if (token) {
        JoblyApi.token = token;
        localStorage.setItem('token', token);
        const decodedPayload = jwtDecode(token);
        const username = decodedPayload.username;
        const user = await JoblyApi.getUser(username);
        setCurrentUser(user);
        setApplicationIds(user.applications);
      }
      else {
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
      setIsLoaded(true);
    }
    fetchUser();
  }, [token]);

  /** logs a user in */
  async function login(formData) {
    const token = await JoblyApi.login(formData);
    setToken(token);
  }

  /** registers a user */
  async function signup(formData) {
    const token = await JoblyApi.signup(formData);
    setToken(token);
  }

  /** updates a user profile */
  async function updateUser(formData) {
    const updatedUser = await JoblyApi.updateUser(formData);
    setCurrentUser(updatedUser);
  }

  /** logs a user out */
  async function logout() {
    setToken(null);
  }

  /** applies to job for currentUser */
  async function applyToJob(jobId) {
    const { username } = currentUser;
    const appliedJobId = await JoblyApi.applyToJob(jobId, username);
    setApplicationIds([...applicationIds, appliedJobId]);
  }

  /** checks if applicationIds */
  function hasAppliedToJob(jobId) {
    return applicationIds.includes(jobId);
  }

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ currentUser, applyToJob, hasAppliedToJob }}>
          <NavBar logout={logout} />
          <RoutesList
            login={login}
            signup={signup}
            updateUser={updateUser} />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
