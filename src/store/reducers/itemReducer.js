const initialState = {
  items: [],
  stockItems: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ITEMS_SUCCESS':
      return { ...state, items: action.payload };
    case 'CREATE_ITEM_SUCCESS':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM_SUCCESS':
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case 'UPDATE_ITEM_STOCK_SUCCESS':
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case 'UPDATE_ITEM_STATUS_SUCCESS':
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    case 'DELETE_ITEM_SUCCESS':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case 'FETCH_STOCK_ITEMS_SUCCESS':
      return { ...state, stockItems: action.payload };
    case 'FETCH_STOCK_ITEM_BY_ID_SUCCESS':
      return { ...state, stockItems: [action.payload] };
    default:
      return state;
  }
};

export default itemReducer;