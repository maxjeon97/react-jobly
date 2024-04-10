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
        <div>
            {errors.length === 0 &&
                <div className="alert alert-success" role="alert">
                    <p className="mb-0 small">Success!</p>
                </div>}
            {errors.length > 0 &&
                <div className="alert alert-danger" role="alert">
                    {errors.map(e => <p className="mb-0 small">{e}</p>)}
                </div>}
        </div>
    );
}