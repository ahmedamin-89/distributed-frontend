import { useState } from "react";

import "./App.css";
import ImageInput from "./components/ImageInput";
import ImageUpload from "./components/ImageUpload";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [recievedImage, setRecievedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  return <ImageUpload />;
  return (
    <div style={{ flex: 1 }}>
      <h1>Distributed Project</h1>
      {/* <div >
        {
        )}
      </div> */}

      <div className="container">
        <div className="imageContainer">
          {uploadedImage && (
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="Uploaded"
              className="image"
            />
          )}
        </div>
        <div className="imageContainer">
          {recievedImage && (
            <img
              src={URL.createObjectURL(recievedImage)}
              alt="Recieved"
              className="image"
            />
          )}
        </div>
      </div>

      <ImageInput onChange={handleImageUpload} />
    </div>
  );
}

export default App;
