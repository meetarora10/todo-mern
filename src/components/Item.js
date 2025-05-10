import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './Item.css';
function Item({items,handleCheck,handleDelete,handleAlert,handleUpdate,editId,editItem,setEditId,setEditItem}){
  return(
    <ul className="item-list">
      {items.map(item => (
      <li key={item._id}>
        {editId === item._id ? (
          <>
            <input
              value={editItem}
              onChange={(e) => setEditItem(e.target.value)}
            />
            <button onClick={() => handleUpdate(item._id)}>Save</button>
          </>
        ) : (
          <>
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
              {item.title}
            </span>
            <button onClick={() => handleCheck(item._id)}>✓</button>
            <button onClick={() => {
              setEditId(item._id);
              setEditItem(item.title);
            }}><FaEdit /></button>
            <button onClick={() => {
              handleDelete(item._id)
              handleAlert(`Deleted ${item.title}`, 'error');
            }}><MdOutlineDelete /></button>
          </>
        )}
      </li>
    ))}

    </ul>
  )
}
export default Item;
// function Item({items,handleCheck,handleDelete,handleAlert,handleUpdate={handleUpdate},editId={editId},editItem={editItem},setEditId={setEditId},setEditItem={setEditItem}}){
//   return (
//     <ul className="item-list">
//       {items.map((item) => (
//         <li key={item._id} className="item">
//           <input
//             type="checkbox"
//             checked={item.completed}
//             onChange={() => handleCheck(item._id)}
//             className="item-checkbox"
//           />
//           <span
//             onDoubleClick={() => handleCheck(item._id)}
//             className={`item-text ${item.completed ? 'completed' : ''}`}
//           >
//             {item.title}
//           </span>
//           <div className="button-container">
//             <button 
//               onClick={() => handleCheck(item._id)} 
//               className="item-button edit-button"
//               aria-label="Edit item"
//             >
//               <FaEdit className="item-icon" />
//             </button>
//             <button 
//               onClick={() => {
//                 handleDelete(item._id);
//                 handleAlert(`Deleted ${item.title}`, 'error');
//               }} 
//               className="item-button delete-button"
//               aria-label="Delete item"
//             >
//               <MdOutlineDelete className="item-icon" />
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }
// export default Item;