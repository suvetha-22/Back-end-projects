import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items').then(res => setItems(res.data));
  }, []);

  const handleSave = async () => {
    if (editingItem) {
      // Update an existing item
      const res = await axios.put(`http://localhost:5000/api/items/${editingItem._id}`, { name: input });
      setItems(items.map(item => (item._id === editingItem._id ? res.data : item)));
      setEditingItem(null);
    } else {
      // Add a new item
      const res = await axios.post('http://localhost:5000/api/items', { name: input });
      setItems([...items, res.data]); // Append the new item to the state
    }
    setInput('');  // Clear the input field
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    setItems(items.filter(item => item._id !== id)); // Remove the item from state
  };

  return (
    <div className="App">    
      
      <input
        type="text"
        placeholder={editingItem ? 'Edit item' : 'Add new item'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSave}>{editingItem ? 'Update' : 'Add'}</button>
      
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => { setInput(item.name); setEditingItem(item); }}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
