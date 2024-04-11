import { useState, useContext } from "react";
import userContext from "./userContext";
import { Navigate } from "react-router-dom";
import Alert from "./Alert";

/** Form for Signing up
 *
 * Props:
 * - signup(): function to call in parent
 *
 * State:
 *
 * - formData
 * - errors: array of error messages
 *
 * RoutesList -> SignupForm -> Alert
 */

function SignupForm({ signup }) {
    const { currentUser } = useContext(userContext);

    const initialState =
    {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState([])

    /** handles form submission */
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await signup(formData);
        }
        catch (err) {
            setErrors([...err])
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
                    <div className="mb-3">
                        <label
                            className="form-label"
                            htmlFor="firstName"
                        >First Name</label>
                        <input
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label
                            className="form-label"
                            htmlFor="lastName"
                        >Last Name</label>
                        <input
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label
                            className="form-label"
                            htmlFor="email"
                        >Email</label>
                        <input
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange} />
                    </div>
                    {errors.length > 0 &&
                        <Alert errors={errors} />}
                    <div className="d-grid">
                        <button
                            type='submit'
                            className='btn btn-primary'>Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;