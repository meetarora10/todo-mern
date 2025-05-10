import { useState,useEffect } from 'react';
import axios from 'axios';
import Todo from './components/Todo';
import Login from './components/Login';
import Signup from './components/Signup';
import {Routes, Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
function App() {
  const [loading, setLoading] = useState(true);
  const[errorF, setErrorF] = useState(null);
  const [items, setItems] = useState([]);
  const [addItem, setAddItem] = useState('');
  const[search, setSearch] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const[editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState('');
  const navigate = useNavigate();
  // useEffect(()=>{
  //     const fetchItems = async () => {
  //       console.log('[FRONTEND] fetchItems triggered');
  //       // const token = document.cookie.includes('uid');
  //       // if(!token){
  //       //   setLoading(false);
  //       //   return;
  //       // }
  //       try{
  //         console.log('[1] fetching...')
  //         const response = await axios.get('http://localhost:5000/api/todos',{withCredentials:true});
  //         console.log('[FRONTEND] Todos fetched:', response.data);
  //         setItems(response.data);
  //         setErrorF(null);
  //       }catch(e){
  //         console.log('Error fetching data:', e);
  //         setErrorF(e.message);
  //       }
  //       finally{
  //         setLoading(false);
  //       }
  //     }
  //     setTimeout(()=>{
  //       fetchItems();
  //     },2000);
  //   },[])
  const handleAlert = (msg, type = 'success') => {
    setShowAlert({ message: msg, type });
    setTimeout(() => setShowAlert(null), 3000);
  };
  const handleUpdate = async (id)=>{
    try{
      await axios.patch(`http://localhost:5000/api/todos/${id}`, {
        title: editItem,
        completed: false
      },{
        withCredentials: true
      });
      const updatedItems = items.map(item => {
        return item._id === id ? {...item, title: editItem} : item
      });
      setItems(updatedItems);
      setEditId(null);
      setEditItem('');
    }catch(e){
      console.log('Error updating item:', e.message);
      setErrorF(e.message);
    }
  }
  const handleCheck = async(id) => {
    const newItems = items.map(item => {
      return item._id === id ? {...item, completed: !item.completed} : item
    });
    setItems(newItems);
    const myItem = newItems.filter(item => item._id === id);
    try{
      await axios.patch(`http://localhost:5000/api/todos/${id}`, {
        title: myItem.title,
        completed: myItem.completed
      },{
        withCredentials: true
      });
    }
    catch (error) {
      console.log('Error updating item:', error.message);
      setErrorF(error.message);
    }
  }
  const handleDelete = async(id) => {
    alert(`Are you sure you want to delete this item?`);
    try{
      await axios.delete(`http://localhost:5000/api/todos/${id}`,{
        withCredentials: true
      });
      setItems(items.filter((item) => item._id !== id));
    }
    catch (error) {
      console.log('Error deleting item:', error.message);
      setErrorF(error.message);
    }
  }
  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout',null,{withCredentials:true});
    navigate('/');
  }
  const handleAdd = async(e) => {
    e.preventDefault();
    if (!addItem) return;
    try{
      const response = await axios.post('http://localhost:5000/api/todos', {
        title: addItem,
        completed: false
      },{
        withCredentials: true
      });
      console.log('Item added:', response.data);
      setItems([...items, response.data.todo]);
      setAddItem('');

    }
    catch (error) {
      console.log('Error adding item:', error.message);
      setErrorF(error.message);
    }
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todo 
        loading={loading}
        errorF={errorF}
        items={items}
        addItem={addItem}
        search={search}
        setSearch={setSearch}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        setAddItem={setAddItem}

        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleAlert={handleAlert}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        editId={editId}
        editItem={editItem}
        setEditId={setEditId}
        setEditItem={setEditItem}
        handleLogout={handleLogout}
        setLoading={setLoading}
        setErrorF={setErrorF}
        setItems={setItems}
        />} />
        <Route path="*" element={<h2>OOPS Page Not Found!!</h2>} />
      </Routes>
    </div>
  )

}
export default App;