import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createImage } from "../../store/images";
import { useSelector } from "react-redux";
import "./NewImageForm.css";

const CreateImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});

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

    if (!name || name.length > 50 || name.length < 1) {
      newErrors["title"] = "Please add a name between 1-50 characters";
    }
    if (!description || description.length < 3) {
      newErrors["description"] =
        "Please add a description between 3-255 characters";
    }
    if (
      !lat ||
      isNaN(lat) ||
      lat.toString().length > 10 ||
      lat.toString().length < 2
    ) {
      newErrors["lat"] = "Please add a latitude";
    }
    if (
      !lng ||
      isNaN(lng || lat.toString().length > 10 || lat.toString().length < 2)
    ) {
      newErrors["lng"] = "Please add a latitude";
    }
    if (
      !url ||
      url.endsWith("jpg") ||
      url.endsWith("png") ||
      url.endsWith("pdf")
    ) {
      newErrors["url"] =
        "Please add a url. Files ending in .jpg, .png, .pdf are not currently supported";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("error hit");
    } else {
      console.log("hit");
      const data = await dispatch(createImage(image));
      console.log(data);
      history.push(`/images/${data.id}`);
    }
  };

  let i = 44.444;
  console.log(i.toString().length);

  return (
    <div className="create-image-container">
      <form className="create-image-form" onSubmit={handleSubmit}>
        <div>
          {/* {Object.keys(errors).length > 0 && (
            <div className="alert error">
              {Object.values(errors).map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )} */}
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
          {description.length > 255 ? (
            <div className="error">
              Description too long. {description.length} characters
            </div>
          ) : (
            ""
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
          <input
            type="number"
            name="lat"
            onChange={(e) => setLat(e.target.value)}
            value={lat}
          ></input>
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
        <button
          className="form-button"
          type="submit"
          disabled={description.length > 255}
        >
          Create Image
        </button>
      </form>
    </div>
  );
};

export default CreateImage;
