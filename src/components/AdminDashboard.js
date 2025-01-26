// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Item from './AdminItem';
import "../styles/AdminDashboard.css";
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

function AdminDashboard({ user, pwd }) {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');

    useEffect(() => {
        const config = {
            auth: {
                username: user.email,
                password: pwd
            }
        };
        axios.get('http://localhost:8080/api/items', config)
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, [user, pwd]);

    const addItem = () => {
        if (name && price) {
            const newItem = { name, price: parseFloat(price) };
            const config = {
                auth: {
                    username: user.email,
                    password: pwd
                }
            };
            axios.post('http://localhost:8080/api/items', newItem, config)
                .then(response => {
                    const notify = () => toast.success('Item Added Successfully');
                    notify();
                    setItems([...items, response.data]);
                    setName('');
                    setPrice('');
                })
                .catch(error => console.error(error));
        }
    };

    const openEditModal = (item) => {
        if (item && item.id) {
            setEditItemId(item.id);
            setEditName(item.name);
            setEditPrice(item.price);
            setIsModalOpen(true);
        } else {
            console.error("Invalid item object:", item);
        }
    };

    const editItem = () => {
        if (editName && editPrice) {
            const updatedItem = { name: editName, price: parseFloat(editPrice) };
            const config = {
                auth: {
                    username: user.email,
                    password: pwd
                }
            };
            axios.put(`http://localhost:8080/api/items/${editItemId}`, updatedItem, config)
                .then(response => {
                    setItems(items.map(item => item.id === editItemId ? response.data : item));
                    const notify = () => toast.success('Item Updated Successfully');
                    notify();
                    closeModal();
                })
                .catch(error => console.error("Error updating item:", error));
        } else {
            console.error("Invalid input data for updating item.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditItemId(null);
        setEditName('');
        setEditPrice('');
    };
    return (
        <div className="AdminDashboard">
            <h1 style={{color:"black",fontSize:'45px'}}>Admin Dashboard</h1>
            <section>
                <h2>Manage Items</h2>
                <div className="form">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Item Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <button onClick={addItem}>Add Item</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item Price (₹)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <Item key={item.id} item={item} onEdit={openEditModal} />
                        ))}
                    </tbody>
                </table>
            </section>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Item"
                className="adminModal"
                overlayClassName="adminOverlay"
            >
                <h2>Edit Item</h2>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Item Price"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                />
                <button onClick={editItem} style={{backgroundColor:'green',marginLeft:'10px'}}>Save</button>
                <button onClick={closeModal} style={{backgroundColor:'darkred',marginLeft:'10px'}}>Cancel</button>
            </Modal>
        </div>
    );
}

export default AdminDashboard;