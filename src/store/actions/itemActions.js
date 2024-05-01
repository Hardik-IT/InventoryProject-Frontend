import axios from 'axios';

export const fetchItems = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/api/items');
    dispatch({ type: 'FETCH_ITEMS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

export const createItem = (item) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/api/items', item);
    dispatch({ type: 'CREATE_ITEM_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

export const updateItem = (id, item) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/items/${id}`, item);
    dispatch({ type: 'UPDATE_ITEM_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error updating item:', error);
  }
};
export const updateItemStock = (id, stock) => async (dispatch) => {
  const formData = new FormData();
  formData.append('stock', stock);

  try {
    const response = await axios.put(`http://localhost:8080/api/items/updateStock/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: 'UPDATE_ITEM_STOCK_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error updating item stock:', error);
  }
};

export const updateItemStatus = (id, status) => async (dispatch) => {
  const formData = new FormData();
  formData.append('status', status);
  formData.append('stock', '0');

  try {
    const response = await axios.put(`http://localhost:8080/api/items/updateItemStatus/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ type: 'UPDATE_ITEM_STATUS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error updating item status:', error);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/api/items/${id}`);
    dispatch({ type: 'DELETE_ITEM_SUCCESS', payload: id });
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

export const fetchStockItems = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/api/items/stock');
    dispatch({ type: 'FETCH_STOCK_ITEMS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching stock items:', error);
  }
};

export const fetchStockItemById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/items/stock/${id}`);
    dispatch({ type: 'FETCH_STOCK_ITEM_BY_ID_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching stock item by id:', error);
  }
};