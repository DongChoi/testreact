import "./CreateCapsuleForm.css";
import React, { useContext, useState } from "react";
import UserContext from "./userContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UploadImages from "./UploadImages";

function CreateCapsuleForm({ createCapsule }) {
  const { currUser } = useContext(UserContext);

  let initialFormData = {
    name: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState([]);
  const [date, setStartDate] = useState(new Date());

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  const handleImagesChange = (e) => {
    //   console.log(e.target.files[0].file); //doing this before
    //   the setter would have been better placement
    setImages((images) => [...images, e.target.files[0]]);
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      console.log("lets make this capsule bro");
      let strDate = date.toLocaleDateString();
      console.log(strDate);
      let dataWithDate = {
        ...formData,
        date: strDate,
      };
      console.log("datawithDate", dataWithDate);
      await createCapsule(dataWithDate, images);
      setFormData(initialFormData);
      setImages([]);
    } catch (error) {
      console.log(
        "There was an error trying to create a capsule! Here is the Error: ",
        error
      );
    }
  }

  return (
    <div className="card">
      <form
        id="capsuleForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="capsule-name">Capsule Name: </label>
          <input
            id="new-capsule-name"
            name="name"
            type="text"
            className="form-control"
            placeholder="Name your Capsule!"
            onChange={handleChange}
            value={formData["name"]}
            aria-label={"name"}
          />
        </div>
        <div>
          <label htmlFor="capsule-message">Message: </label>
          <input
            id="new-capsule-message"
            name="message"
            type="text"
            className="form-control"
            placeholder="Leave a message!"
            onChange={handleChange}
            value={formData["message"]}
            aria-label={"message"}
          />
        </div>
        <div>
          <label htmlFor="capsule-return-date">Return Date: </label>
          <DatePicker selected={date} onChange={(date) => setStartDate(date)} />
        </div>
        <div>
          <label htmlFor="capsule-images">Image Files: </label>
          <input
            type="file"
            multiple
            accept="image/*"
            name="image-file"
            id="file"
            onChange={handleImagesChange}
          />
        </div>
        <button className="create-button btn-primary rig btn btn-lrg">
          Create Capsule
        </button>
        <div>
          <h1>Here are the images you are about to upload:</h1>;
          {/* TODO: make a remove from state function with an x button or something */}
          {images.map((image, imageIndex) => (
            <div className="images-preview" key={imageIndex}>
              {console.log(imageIndex)}
              <img
                src={URL.createObjectURL(image)}
                height="400px"
                width="400px"
                alt="failed to upload"
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default CreateCapsuleForm;
