import { useState } from "react";

/** SearchForm component for Jobly
 *
 * props: handleSearch()
 * state: formData
 *
 *
 * {JobsList, CompaniesList} -> SearchForm
 *
 *
*/
function SearchForm({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    /** handle input change */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    /** function to call a function in parent then clears search form */
    function handleSubmit(evt) {
        evt.preventDefault();
        handleSearch(searchTerm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                id="searchTerm"
                name="searchTerm"
                placeholder="Enter search term..."
                onChange={handleChange}
                value={searchTerm} />
            <button type="submit"
                className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}

export default SearchForm;