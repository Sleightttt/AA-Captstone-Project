import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createImage } from "../../store/images";
import { useSelector } from "react-redux";
import "./NewImageForm.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([""]);
  const [errors, setErrors] = useState({});
  const [quantity, setQuantity] = useState("");

  if (!user) {
    history.push("/login");
  }

  let image = {
    name,
    description,
    lat,
    lng,
    url,
    userId,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    // const imgPattern = /\.(jpg|jpeg|png|gif)$/i;
    // if (!images || !imgPattern.test(images)) {
    //   newErrors["images"] =
    //     "Please add at least one image and make sure its a valid image link 'example: ends with jpg, jpeg, png, gif' ";
    // }
    if (!name) {
      newErrors["title"] = "Please add a name";
    }
    if (!description) {
      newErrors["description"] = "Please add a description";
    }
    if (!lat) {
      newErrors["lat"] = "Please add a lat";
    }
    if (!lng) {
      newErrors["lng"] = "Please add a lng";
    }
    if (!url) {
      newErrors["url"] = "Please add a url";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const data = await dispatch(createImage(image));
      console.log(data);
      history.push(`/images/${data.id}`);
    }
  };

  //   const updateImage = (e, idx) => {
  //     const newImages = [...images];
  //     newImages[idx] = e.target.value;
  //     setImages(newImages);
  //   };

  //   const addImage = () => {
  //     const newImages = [...images];
  //     newImages.push("");
  //     setImages(newImages);
  //   };

  return (
    <div className="create-image-container">
      <form className="create-image-form" onSubmit={handleSubmit}>
        <div>
          {Object.keys(errors).length > 0 && (
            <div className="alert error">
              {Object.values(errors).map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div className="form-item">
          {errors["title"] && <div className="error">{errors["title"]}</div>}
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </div>
        <div className="form-item">
          {errors["description"] && (
            <div className="error">{errors["description"]}</div>
          )}
          <label>Description</label>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div className="form-item">
          {errors["description"] && (
            <div className="error">{errors["lat"]}</div>
          )}
          <label>Latitude</label>
          <textarea
            name="lat"
            onChange={(e) => setLat(e.target.value)}
            value={lat}
          ></textarea>
        </div>
        <div className="form-item">
          {errors["lng"] && <div className="error">{errors["lng"]}</div>}
          <label>Longitude</label>
          <input
            type="number"
            name="lng"
            onChange={(e) => setLng(e.target.value)}
            value={lng}
          ></input>
        </div>
        <div className="form-item">
          {errors["url"] && <div className="error">{errors["url"]}</div>}
          <label>Image Url</label>
          <input
            type="text"
            name="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          ></input>
        </div>
        {/* <div className="form-item">
          {errors["images"] && <div className="error">{errors["images"]}</div>}
          <label>Images</label>
          {images.map((image, idx) => (
            <input
              key={idx}
              type="text"
              name="image"
              onChange={(e) => updateImage(e, idx)}
              value={image}
            ></input>
          ))}
          <button className="form-button" type="button" onClick={addImage}>
            Add Image
          </button>
        </div> */}
        <button className="form-button" type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
