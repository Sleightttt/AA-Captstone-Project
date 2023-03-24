import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editImage } from "../../store/images";
import { getSingleImage } from "../../store/images";
import "./UpdateImage.css";

const UpdateImage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const image = useSelector((state) => state.images.singleImage);
  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const [name, setName] = useState(image.name || "");
  const [description, setDescription] = useState(image.description || "");
  const [lat, setLat] = useState(image.lat || "");
  const [lng, setLng] = useState(image.lng || "");
  const [errors, setErrors] = useState({});
  const [url, setUrl] = useState(image.url || "");

  if (!user) {
    history.push("/login");
  }

  useEffect(() => {
    const updateFields = async () => {
      const singleImage = await dispatch(getSingleImage(id));
      setName(singleImage.name);
      setDescription(singleImage.description);
      setLat(singleImage.lat);
      setLng(singleImage.lng);
      setUrl(singleImage.url);
    };

    updateFields();
  }, [dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageObj = {
      id,
      name: name,
      description,
      url,
      lat,
      lng,
      userId,
    };

    let newErrors = {};

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
      newErrors["lng"] = "Please add a quantity";
    }
    if (!url) {
      newErrors["url"] = "Please add a url";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const data = await dispatch(editImage(imageObj));
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

  //   const removeImage = (idx) => {
  //     const newImages = [...images];
  //     newImages.splice(idx, 1);
  //     setImages(newImages);
  //     dispatch(editProduct({ ...product, images: newImages }));
  //   };

  if (Object.keys(image).length === 0) {
    return null;
  }

  return (
    <div className="create-image-container">
      <form onSubmit={handleSubmit}>
        <div className="create-image-form">
          <div className="form-item">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </div>
          <div className="form-item">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <div className="error">{errors.description}</div>
            )}
          </div>
          <div className="form-item">
            <label>Lat</label>
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </div>
          <div className="form-item">
            <label>Lng</label>
            <input
              type="number"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </div>
          <div className="form-item">
            <label>Url</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {errors.quantity && <div className="error">{errors.quantity}</div>}
          </div>
          {/* <div className="create-product-images">
                <label>Images</label>
                {images.map((image,idx) => (
                <div key={idx} className="create-product-image">
                    <input type="text" value={image.url} onChange={(e) => updateImage(e, idx)} />
                    <button type="button" onClick={() => removeImage(idx)}>
                    Remove
                    </button>
                </div>
                ))}
                <button type="button" onClick={addImage}>
                Add Image
                </button>
                {errors.images && <div className="error">{errors.images}</div>}
            </div> */}
          <button className="form-button" type="submit">
            Edit Image
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateImage;
