import axios from 'axios';

export const uploadImage = (image) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await axios.put('http://localhost:8080/api/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({
      type: 'UPLOAD_IMAGE_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

export const downloadImage = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/image/${id}`, {
      responseType: 'blob',
    });

    const imageUrl = URL.createObjectURL(response.data);

    dispatch({
      type: 'DOWNLOAD_IMAGE_SUCCESS',
      payload: imageUrl,
    });
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};