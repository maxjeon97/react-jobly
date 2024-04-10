import './CompanyCardList.css';
import CompanyCard from './CompanyCard';
import SearchNotFound from "./SearchNotFound";

/** CompanyCardList component for Jobly.
 *
 * Props:
 * - companies: array of company objects
 *
 * State: none
 *
 * CompaniesList -> CompanyCardList -> {SearchNotFound, CompanyCard}
 */

function CompanyCardList({ companies }) {
    return (
        <div className='CompanyCardList'>
            {companies.length === 0 &&
                <SearchNotFound />}
            {companies.map(c => <CompanyCard key={c.handle} company={c} />)}
        </div>
    );
}

export default CompanyCardList;