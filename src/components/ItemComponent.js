import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchItems,
  createItem,
  updateItem,
  updateItemStock,
  deleteItem,
  fetchStockItems,
  fetchStockItemById,
  updateItemStatus,
} from '../store/actions/itemActions';
import { fetchCategories } from '../store/actions/categoryActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemComponent = () => {
  const dispatch = useDispatch();
  const { items, stockItems } = useSelector((state) => state.item);
  const { categories } = useSelector((state) => state.category);
  const [newItem, setNewItem] = useState({
    itemName: '',
    price: 0,
    quantity: 0,
    status: 'In Stock',
    category: { id: null, categoryName: '' },
  });
  const [editingItem, setEditingItem] = useState(null);
  const [stockUpdateItem, setStockUpdateItem] = useState(null);
  const [statusUpdateItem, setStatusUpdateItem] = useState(null);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchStockItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreateItem = () => {
    if (newItem.itemName.trim() && newItem.category.id) {
      dispatch(createItem(newItem));
      setNewItem({
        itemName: '',
        price: 0,
        quantity: 0,
        status: 'In Stock',
        category: { id: null, categoryName: '' },
      });
    }
  };

  const handleUpdateItem = (id) => {
    const updatedItem = {
      id,
      itemName: editingItem.itemName,
      price: editingItem.price,
      quantity: editingItem.quantity,
      status: editingItem.status,
      category: editingItem.category,
    };
    dispatch(updateItem(id, updatedItem));
    setEditingItem(null);
  };

  const handleUpdateItemStock = (id, stock) => {
    dispatch(updateItemStock(id, stock));
    setStockUpdateItem(null);
  };

  const handleUpdateItemStatus = (id, status) => {
    dispatch(updateItemStatus(id, status));
    setStatusUpdateItem(null);
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleFetchStockItemById = (id) => {
    dispatch(fetchStockItemById(id));
  };

  return (
    <div className="container">
      <h2>Items</h2>
      <form className="form-inline">
        <div className="form-group mr-3">
          <label>Item Name:</label>
          <input
            type="text"
            value={newItem.itemName}
            onChange={(e) => setNewItem({...newItem, itemName: e.target.value })}
            placeholder="Enter item name"
            className="form-control"
          />
        </div>
        <div className="form-group mr-3">
          <label>Price:</label>
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) })}
            placeholder="Enter item price"
            className="form-control"
          />
        </div>
        <div className="form-group mr-3">
          <label>Quantity:</label>
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) })}
            placeholder="Enter item quantity"
            className="form-control"
          />
        </div>
        <div className="form-group mr-3">
          <label>Category:</label>
          <select
            value={newItem.category.id || ''}
            onChange={(e) => setNewItem({...newItem, category: { id: parseInt(e.target.value), categoryName: '' } })}
            className="form-control"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleCreateItem} className="btn btn-primary">
          Create Item
        </button>
      </form>
      <ul className="list-group mt-3">
        {items.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingItem && editingItem.id === item.id? (
              <div>
                <input
                  type="text"
                  value={editingItem.itemName}
                  onChange={(e) =>
                    setEditingItem({...editingItem, itemName: e.target.value })
                  }
                  className="form-control"
                />
                <input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) =>
                    setEditingItem({...editingItem, price: parseFloat(e.target.value) })
                  }
                  className="form-control"
                />
                <input
                  type="number"
                  value={editingItem.quantity}
                  onChange={(e) =>
                    setEditingItem({...editingItem, quantity: parseInt(e.target.value) })
                  }
                  className="form-control"
                />
                <select
                  value={editingItem.category.id || ''}
                  onChange={(e) =>
                    setEditingItem({
                     ...editingItem,
                      category: { id: parseInt(e.target.value), categoryName: '' },
                    })
                  }
                  className="form-control"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleUpdateItem(item.id)} className="btn btn-primary ml-2">
                  Update
                </button>
                <button onClick={() => setEditingItem(null)} className="btn btn-secondary ml-2">
                  Cancel
                </button>
              </div>
            ) : stockUpdateItem && stockUpdateItem.id === item.id? (
              <div>
                <span>{`${item.itemName} (${item.quantity})`}</span>
                <input
                  type="number"
                  value={stockUpdateItem.quantity}
                  onChange={(e) =>
                    setStockUpdateItem({...stockUpdateItem, quantity: parseInt(e.target.value) })
                  }
                  className="form-control"
                />
                <button
                  onClick={() => handleUpdateItemStock(item.id, stockUpdateItem.quantity)}
                  className="btn btn-primary ml-2"
                >
                  Update Stock
                </button>
                <button onClick={() => setStockUpdateItem(null)} className="btn btn-secondary ml-2">
                  Cancel
                </button>
              </div>
            ) : statusUpdateItem && statusUpdateItem.id === item.id? (
              <div>
                <span>{`${item.itemName} (${item.status})`}</span>
                <select
                  value={statusUpdateItem.status}
                  onChange={(e) =>
                    setStatusUpdateItem({...statusUpdateItem, status: e.target.value })
                  }
                  className="form-control"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out Of Stock">Out of Stock</option>
                </select>
                <button
                  onClick={() => handleUpdateItemStatus(item.id, statusUpdateItem.status)}
                  className="btn btn-primary ml-2"
                >
                  Update Status
                </button>
                <button onClick={() => setStatusUpdateItem(null)} className="btn btn-secondary ml-2">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className="mr-3">{`${item.itemName} (${item.quantity} - ${item.status})`}</span>
                <span className="badge badge-primary mr-3">{item.category.categoryName}</span>
                <div className="d-flex justify-content-end">
                  <button onClick={() => setEditingItem(item)} className="btn btn-primary mr-2">
                    Edit
                  </button>
                  <button onClick={() => setStockUpdateItem(item)} className="btn btn-primary mr-2">
                    Update Stock
                  </button>
                  <button onClick={() => setStatusUpdateItem(item)} className="btn btn-primary mr-2">
                    Update Status
                  </button>
                  <button onClick={() => handleDeleteItem(item.id)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>Stock Items</h2>
      <ul className="list-group mt-3">
        {stockItems.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{`${item.itemName} (${item.quantity})`}</span>
            {/* <button onClick={() => handleFetchStockItemById(item.id)} className="btn btn-primary ml-2">
              View Details
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemComponent;