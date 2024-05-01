const initialState = {
    uploadedImage: null,
    downloadedImage: null,
  };
  
  const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPLOAD_IMAGE_SUCCESS':
        return {
          ...state,
          uploadedImage: action.payload,
        };
      case 'DOWNLOAD_IMAGE_SUCCESS':
        return {
          ...state,
          downloadedImage: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default imageReducer;