import { useState, useContext } from "react";
import userContext from "./userContext";


/** Form for editing user profile
 *
 * Props:
 * - updateUser(): (function for adding a box)
 *
 * State:
 * - formData
 * - formAlerts
 *
 * RoutesList -> EditProfileForm -> Alert
 */

function EditProfileForm({ updateUser }) {
    const { currentUser } = useContext(userContext);

    const initialState =
    {
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
    };

    const [formData, setFormData] = useState(initialState);
    const [formAlerts, setFormAlerts] = useState({
        hasSubmitted: false,
        errors: [],
    });

    /** handles form submission */
    function handleSubmit(evt) {
        evt.preventDefault();
        try {
            updateUser(formData);
        }
        catch (err) {
            setFormAlerts({
                hasSubmitted: true,
                errors: [...err.error.message],
            });
        }
        setFormAlerts({
            ...formAlerts,
            hasSubmitted: true,
        });
    }

    /** handles input change */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(d => ({
            ...d,
            [name]: value,
        }));
    }

    return (
        <div className="card">
            <div className="card-body">
                <form
                    className="EditProfileForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            className="form-label"
                            htmlFor="username"
                        >Username</label>
                        <input
                            disabled
                            className="form-control"
                            placeholder={formData.username}
                            name="username"
                            value={formData.username}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label
                            className="form-label"
                            htmlFor="firstName"
                        >First Name</label>
                        <input
                            className="form-control"
                            placeholder={formData.firstName}
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
                            placeholder={formData.lastName}
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
                            placeholder={formData.email}
                            name="email"
                            value={formData.email}
                            onChange={handleChange} />
                    </div>
                    {formAlerts.hasSubmitted &&
                        <Alert errors={formAlerts.errors} />}
                    <div className="d-grid">
                        <button
                            type='submit'
                            className='btn btn-primary'>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfileForm;