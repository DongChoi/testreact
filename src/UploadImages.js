import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UploadImages({ upload }) {
  const [images, setImages] = useState([]);
  const handleChange = (e) => {
    //   console.log(e.target.files[0].file); //doing this before
    //   the setter would have been better placement
    setImages((images) => [...images, e.target.files[0]]);
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    await upload(images);
  }

  return (
    <div>
      <form
        id="ImageForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          accept="image/*"
          name="image-file"
          id="file"
          onChange={handleChange}
        />
        <button className="btn btn-primary btn-lg">Upload</button>
      </form>
      <div>
        <h1>Here are all of the images you've uploaded!</h1>;
        {images.map((image) => (
          <img
            src={URL.createObjectURL(image)}
            height="400px"
            width="400px"
            alt="no images was able to be uploaded :("
          />
        ))}
      </div>
    </div>
  );
}

export default UploadImages;
