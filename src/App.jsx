import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import RoutesList from './RoutesList';
import userContext from './userContext';
import { useState } from 'react';
import JoblyApi from './api';


/** Component for entire page.
 *
 * Props: none
 *
 * State:
 * - user
 * - token
 *
*/

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  /** logs a user in */
  async function login(formData) {
    const token = await JoblyApi.login(formData);
    JoblyApi.token = token;
    setToken(token);
  }

  /** registers a user */
  async function register(formData) {
    const token = await JoblyApi.register(formData);
    JoblyApi.token = token;
    setToken(token);
  }

  /** updates a user profile */
  async function updateUserProfile(formData) {
    const updatedUser = await JoblyApi.updateUser(formData);
    setCurrentUser(updatedUser);
  }

  /** logs a user out */
  async function logout() {
    setCurrentUser(null);
    JoblyApi.token = null;
    setToken(null);
  }

  return (
    <div className="App">
        <BrowserRouter>
          <userContext.Provider value={{currentUser}}>
            <NavBar />
            <RoutesList />
          </userContext.Provider>
        </BrowserRouter>
    </div>
  );
};

export default App;
