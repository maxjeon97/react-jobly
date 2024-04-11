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
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(function fetchUserOnLoadAndTokenChange() {
    async function fetchUser() {
      if (token) {
        JoblyApi.token = token;
        const decodedPayload = jwtDecode(token);
        const username = decodedPayload.username;
        const user = await JoblyApi.getUser(username);
        setCurrentUser(user);
      }
      else {
        setCurrentUser(null);
      }
      setIsLoaded(true);
    }
    fetchUser();
  }, [token]);

  /** logs a user in */
  async function login(formData) {
    const token = await JoblyApi.login(formData);
    localStorage.setItem('token', token);
    setToken(token);
  }

  /** registers a user */
  async function signup(formData) {
    const token = await JoblyApi.signup(formData);
    localStorage.setItem('token', token);
    setToken(token);
  }

  /** updates a user profile */
  async function updateUser(formData) {
    const updatedUser = await JoblyApi.updateUser(formData);
    setCurrentUser(updatedUser);
  }

  /** logs a user out */
  async function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ currentUser }}>
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
