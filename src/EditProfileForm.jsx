import { useState, useContext } from "react";
import userContext from "./userContext";
import Alert from "./Alert";


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

    if (!currentUser) return <Navigate to="/" />;

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
        isSuccessful: false,
        alertMessages: [],
    });

    /** handles form submission */
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await updateUser(formData);
            setFormAlerts({
                hasSubmitted: true,
                isSuccessful: true,
                alertMessages: ["Updated profile successfully!"],
            });
        }
        catch (err) {
            setFormAlerts({
                hasSubmitted: true,
                isSuccessful: false,
                alertMessages: [...err],
            });
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

    return (
        <div className="EditProfileForm container col-lg-4 mt-4">
            <h2 className="text-light mb-2">Edit Profile</h2>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                className="form-label fw-bold"
                            >Username</label>
                            <input
                                disabled
                                className="form-control"
                                name="username"
                                value={formData.username} />
                        </div>
                        <div className="mb-3">
                            <label
                                className="form-label fw-bold"
                                htmlFor="firstName"
                            >First Name</label>
                            <input
                                id="firstName"
                                className="form-control"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label
                                className="form-label fw-bold"
                                htmlFor="lastName"
                            >Last Name</label>
                            <input
                                id="lastName"
                                className="form-control"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label
                                className="form-label fw-bold"
                                htmlFor="email"
                            >Email</label>
                            <input
                                id="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange} />
                        </div>
                        {formAlerts.hasSubmitted &&
                            <Alert
                                messages={formAlerts.alertMessages}
                                type={formAlerts.isSuccessful
                                    ? "success"
                                    : "danger"} />}
                        <div className="d-grid">
                            <button
                                type='submit'
                                className='btn btn-primary'>Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfileForm;