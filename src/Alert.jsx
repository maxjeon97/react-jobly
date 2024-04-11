/** Alert component for Jobly
 *
 * Props:
 * - errors: array of error messages [message, ...]
 *
 * State: none
 *
 * {EditProfileForm, LoginForm, SignupForm} -> Alert
 */

function Alert({ errors }) {
    return (
        <div className="Alert">
            {errors.length === 0
                ?
                <div className="alert alert-success" role="alert">
                    <p className="mb-0 small">Success!</p>
                </div>
                :
                <div className="alert alert-danger" role="alert">
                    {errors.map((e, idx) => <p key={idx} className="mb-0 small">{e}</p>)}
                </div>}
        </div>
    );
}

export default Alert;