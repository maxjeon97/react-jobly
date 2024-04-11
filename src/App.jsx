import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import RoutesList from './RoutesList';
import userContext from './userContext';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import { jwtDecode } from 'jwt-decode';


/** Component for entire page.
 *
 * Props: none
 *
 * State:
 * - user
 * - token
 *
 * App -> {Navbar, RoutesList}
*/


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(function fetchUserWhenMounted() {
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
