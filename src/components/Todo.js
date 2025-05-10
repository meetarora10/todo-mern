import Add from "./Add";
import Header from "./Header";
import AlertBox from "./AlertBox";
import Content from "./Content";
import Footer from "./Footer";
import Search from "./Search";
import { useEffect } from "react";
import axios from "axios";
function Todo({loading, errorF, items,addItem,search, setSearch,showAlert,setShowAlert,setAddItem, handleCheck, handleDelete, handleAlert, handleAdd,handleUpdate,editId,editItem,setEditId,setEditItem,handleLogout,setLoading,setErrorF,setItems}) {
      useEffect(()=>{
          const fetchItems = async () => {
            console.log('[FRONTEND] fetchItems triggered');
            // const token = document.cookie.includes('uid');
            // if(!token){
            //   setLoading(false);
            //   return;
            // }
            try{
              console.log('[1] fetching...')
              const response = await axios.get('http://localhost:5000/api/todos',{withCredentials:true});
              console.log('[FRONTEND] Todos fetched:', response.data);
              setItems(response.data);
              setErrorF(null);
            }catch(e){
              console.log('Error fetching data:', e);
              setErrorF(e.message);
            }
            finally{
              setLoading(false);
            }
          }
          fetchItems();
        },[])
    return (
        <main>
            {showAlert && <AlertBox message={showAlert.message} type={showAlert.type} onClose={()=>setShowAlert(null)}/>}
            <Header title="TO-DO List" handleLogout = {handleLogout}/>
            <Add handleAdd={handleAdd} addItem={addItem} setAddItem={setAddItem} handleAlert={handleAlert}/>
            <Search search={search} setSearch={setSearch}/>
            {loading && <p style={{textAlign:'center'}}>Loading items...</p>}
            <main>
                {errorF && <p style={{color:'red',textAlign:'center'}}>{`Error: ${errorF}`}</p>}
            {!loading && <Content items={items.filter(item=>((item.title || '').toUpperCase()).includes(search.toUpperCase()))} 
            handleCheck={handleCheck} 
            handleDelete={handleDelete} 
            handleAlert={handleAlert} 
            handleUpdate={handleUpdate}
            editId={editId} 
            editItem={editItem} 
            setEditId={setEditId} 
            setEditItem={setEditItem} 
            />}
            </main>
            <Footer count={items.length}/>
        </main>
    )
}
export default Todo;