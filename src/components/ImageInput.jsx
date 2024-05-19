import React from "react";
import classes from "./ImageInput.module.css";

const ImageInput = ({ onChange, maxSize = 5 * 1024 * 1024 }) => {
  // Default to 5MB
  const handleFiles = (event) => {
    const files = [...event.target.files];

    for (let file of files) {
      if (file.size > maxSize) {
        alert(
          `${file.name} exceeds the maximum size of ${
            maxSize / (1024 * 1024)
          }MB.`
        );
        return; // Exit if any file is too large
      }
    }

    // If all files are okay, call the onChange prop
    onChange(event);
  };

  return (
    <button style={{}}>
      <label htmlFor="imageInput">Upload</label>
      <input
        type="file"
        id="imageInput"
        onChange={handleFiles}
        multiple
        className={classes.input}
        accept="image/*"
      />
    </button>
  );
};

export default ImageInput;
