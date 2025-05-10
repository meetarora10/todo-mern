import Item from './Item';
function Content({items,handleCheck,handleDelete,handleAlert,handleUpdate,editId,editItem,setEditId,setEditItem}){
    return(
        <>
            {items.length ? (
                <Item 
                items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                handleAlert={handleAlert}
                handleUpdate={handleUpdate}
                editId={editId}
                editItem={editItem}
                setEditId={setEditId}
                setEditItem={setEditItem}
                />
            ) : (
                <p style={{ color: 'red' }}>No items present in the list.</p>
            )}
        </>
    )

}
export default Content;