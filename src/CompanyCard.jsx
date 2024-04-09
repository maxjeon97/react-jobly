import './CompanyCard.css';
import { Link } from 'react-router-dom';

/** CompanyCard component for Jobly.
 *
 * Props:
 * - company: { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }]
 *
 * State: none
 *
 * CompanyCardList -> CompanyCard
 */

function CompanyCard({ company }) {
    return (
        <Link
            className='CompanyCard card'
            to={`/companies/${company.handle}`}>
            <div className='CompanyCard-body'>
                <h5>
                    {company.name}
                    {company.logoUrl &&
                        <img src={"/logo1.png"} alt={company.name} />}
                </h5>
                <p>{company.description}</p>
            </div>
        </Link>
    );
}

export default CompanyCard;