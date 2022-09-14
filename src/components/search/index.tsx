import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="content">
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          placeholder="enter your search"
          aria-label="search"
        />
        <button className="search-bar__submit">
          <FaSearch aria-label="submit search" />
        </button>
      </div>
    </div>
  );
};
export default Search;
