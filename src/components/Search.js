import './Item.css'
const Search = ({ search,setSearch }) => {
  return (
    <form onSubmit={(e)=>e.preventDefault()} className="search-form">
      <label htmlFor="search">Search</label>
      <input type="text" placeholder="Enter an item"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />
    </form>
  )
}

export default Search
