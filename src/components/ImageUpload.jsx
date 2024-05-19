import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [operation, setOperation] = useState("grayscale");
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleUpload = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("operation", operation);
    axios
      .post("http://3.29.102.168:5000/process_image", formData, {
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]));
        setProcessedImage(url);
      })
      .catch((error) => {
        console.error("Error uploading the image:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="imagesContainer">
        <div className="imageContainer">
          {image && (
            <img
              src={URL.createObjectURL(image)}
              className="image"
              alt="original"
            />
          )}
        </div>
        <div className="imageContainer">
          {processedImage && (
            <img src={processedImage} className="image" alt="processed" />
          )}
          {loading && <h4 style={{ color: "red" }}>Processing...</h4>}
        </div>
      </div>
      <div style={{ paddingTop: "1em" }}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <select value={operation} onChange={handleOperationChange}>
          <option value="grayscale">Grayscale</option>
          <option value="blur">Blur</option>
          <option value="color_inversion">Color Inversion</option>
          <option value="threshold_segmentation">Threshold Segmentation</option>
          <option value="adaptive_threshold_segmentation">
            Adaptive Threshold Segmentation
          </option>
        </select>
      </div>
      <div className="buttonContainer">
        <button onClick={handleUpload}>Upload and Process</button>
      </div>
      {processedImage && (
        <div>
          <a href={processedImage} download="processed_image.jpg">
            Download Processed Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
