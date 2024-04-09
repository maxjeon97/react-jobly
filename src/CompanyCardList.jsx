import './CompanyCardList.css';
import CompanyCard from './CompanyCard';

/** CompanyCardList component for Jobly.
 *
 * Props:
 * - companies: array of company objects
 *
 * State: none
 *
 * CompaniesList -> CompanyCardList -> CompanyCard
 */

function CompanyCardList({ companies }) {
    return (
        <div className='CompanyCardList'>
            {companies.length === 0 &&
                <p>Sorry, no results were found!</p>}
            {companies.map(c => <CompanyCard key={c.handle} company={c} />)}
        </div>
    );
}

export default CompanyCardList;