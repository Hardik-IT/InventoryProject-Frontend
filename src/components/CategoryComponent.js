import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../store/actions/categoryActions';

const CategoryComponent = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [newCategory, setNewCategory] = useState({ categoryName: '' });
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreateCategory = () => {
    if (newCategory.categoryName.trim()) {
      dispatch(createCategory(newCategory));
      setNewCategory({ categoryName: '' });
    }
  };

  const handleUpdateCategory = (id) => {
    const updatedCategory = {
      id,
      categoryName: editingCategory.categoryName,
    };
    dispatch(updateCategory(id, updatedCategory));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="container">
      <h2>Categories</h2>
      <form className="form-inline">
        <input
          type="text"
          value={newCategory.categoryName}
          onChange={(e) => setNewCategory({ categoryName: e.target.value })}
          placeholder="Enter category name"
          className="form-control"
        />
        <button onClick={handleCreateCategory} className="btn btn-primary ml-2">
          Create Category
        </button>
      </form>
      <ul className="list-group mt-3">
        {categories.map((category) => (
          <li key={category.id} className="list-group-item d-flex justify-content-between">
            {editingCategory && editingCategory.id === category.id? (
              <div>
                <input
                  type="text"
                  value={editingCategory.categoryName}
                  onChange={(e) =>
                    setEditingCategory({...editingCategory, categoryName: e.target.value })
                  }
                  className="form-control"
                />
                <button onClick={() => handleUpdateCategory(category.id)} className="btn btn-primary ml-2">
                  Update
                </button>
                <button onClick={() => setEditingCategory(null)} className="btn btn-secondary ml-2">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span style={{ marginRight: 20 }}>{category.categoryName}</span>
                <div>
                  <button onClick={() => setEditingCategory(category)} className="btn btn-primary">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(category.id)} className="btn btn-danger ml-2">
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryComponent;