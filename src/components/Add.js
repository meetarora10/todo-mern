import './Add.css';
// import AlertBox from './AlertBox';
function Add({handleAdd,addItem,setAddItem,handleAlert}) {
    const handleChange = (e) => {
        setAddItem(e.target.value);
    }
    return(

        <form onSubmit={handleAdd} className="add-form">
            <label htmlFor="add">Add Item</label>
            <input type="text" id="add" 
            required
            placeholder="Add Item"
            value={addItem}
            onChange={(e)=>handleChange(e)}
            />
            <button type="submit"
            onClick={
                addItem.length > 0 ? ()=>handleAlert('TO-DO Item Added') : ()=>handleAlert('Please add a TO-DO Item','error')
}
            >Add Item</button>
        </form>
    )
}
export default Add;