import { useState, useContext } from "react";
import userContext from "./userContext";
import { Navigate } from "react-router-dom";
import Alert from "./Alert";

/** Form for logging in
 *
 * Props:
 * - login(): function to call in parent
 *
 * State:
 * - formData
 * - errors: array of error messages
 *
 * RoutesList -> LoginForm -> Alert
 */

function LoginForm({ login }) {
    const { currentUser } = useContext(userContext);

    const initialState =
    {
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState([]);

    /** handles form submission */
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await login(formData);
        }
        catch (err) {
            setErrors([...err]);
        }
    }

    /** handles input change */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(d => ({
            ...d,
            [name]: value,
        }));
    }

    if (currentUser) return <Navigate to="/" />;

    return (
        <div className="card">
            <div className="card-body">
                <form
                    className="LoginForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            className="form-label"
                            htmlFor="username"
                        >Username</label>
                        <input
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label
                            className="form-label"
                            htmlFor="password"
                        >Password</label>
                        <input
                            className="form-control"
                            name="password"
                            value={formData.password}
                            type="password"
                            onChange={handleChange} />
                    </div>
                    {errors.length > 0 &&
                        <Alert errors={errors} />}
                    <div className="d-grid">
                        <button
                            type='submit'
                            className='btn btn-primary'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;