import React from 'react';

function AdminItem({ item, onEdit }) {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
                <button onClick={() => onEdit(item)}>Edit</button>
            </td>
        </tr>
    );
}

export default AdminItem;
