import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, downloadImage } from '../store/actions/imageActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageComponent = () => {
  const dispatch = useDispatch();
  const { uploadedImage, downloadedImage } = useSelector((state) => state.image);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadImage(selectedFile));
    }
  };

  const handleDownload = () => {
    if (uploadedImage) {
      dispatch(downloadImage(uploadedImage.id));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload and Download Image</h2>
      <div className="form-group">
        <input type="file" onChange={handleFileChange} className="form-control" />
      </div>
      <button onClick={handleUpload} className="btn btn-primary">Upload Image</button>
      {uploadedImage && (
        <div className="mt-3">
          <p>Uploaded Image ID: {uploadedImage.id}</p>
          <button onClick={handleDownload} className="btn btn-primary">Download Image</button>
        </div>
      )}
      {downloadedImage && (
        <div className="mt-3">
          <img src={downloadedImage} alt="Downloaded Image" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;