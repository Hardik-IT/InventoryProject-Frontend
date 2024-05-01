import axios from 'axios';

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/api/category');
    dispatch({
      type: 'FETCH_CATEGORIES_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/api/category', category);
    dispatch({
      type: 'CREATE_CATEGORY_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error creating category:', error);
  }
};

export const updateCategory = (id, category) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/category/${id}`, category);
    dispatch({
      type: 'UPDATE_CATEGORY_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error updating category:', error);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/api/category/${id}`);
    dispatch({
      type: 'DELETE_CATEGORY_SUCCESS',
      payload: id,
    });
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};