import { useState, useContext } from "react";
import userContext from "./userContext";
import { Navigate, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    /** handles form submission */
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await login(formData);
            navigate("/");
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
        <div className="LoginForm container col-lg-4 mt-4">
            <h2 className="text-light mb-2">Login</h2>
            <div className="card">
                <div className="card-body">
                    <form
                        className="LoginForm" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                className="form-label fw-bold"
                                htmlFor="username"
                            >Username</label>
                            <input
                                id="username"
                                className="form-control"
                                name="username"
                                value={formData.username}
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label
                                className="form-label fw-bold"
                                htmlFor="password"
                            >Password</label>
                            <input
                                id="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                type="password"
                                onChange={handleChange} />
                        </div>
                        {errors.length > 0 &&
                            <Alert messages={errors} type="danger"/>}
                        <div className="d-grid">
                            <button
                                type='submit'
                                className='btn btn-primary'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;