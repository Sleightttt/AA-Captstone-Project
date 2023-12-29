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

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("url", url);
    formData.append("userId", userId);

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
      newErrors["lat"] = "Please add latitude";
    }
    if (
      !lng ||
      isNaN(lng || lat.toString().length > 10 || lat.toString().length < 2)
    ) {
      newErrors["lng"] = "Please add longitude";
    }
    // if (
    //   !url ||
    //   url.endsWith("jpg") ||
    //   url.endsWith("png") ||
    //   url.endsWith("pdf")
    // ) {
    //   newErrors["url"] = "Please add a url";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const data = await dispatch(editImage(formData));

      history.push(`/images/${id}`);
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              className="desc-new-image"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <div className="error">{errors.description}</div>
            )}
          </div>
          {/* <div className="form-item">
            <label>Lat</label>
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            {errors.lat && <div className="error">{errors.lat}</div>}
          </div>
          <div className="form-item">
            <label>Lng</label>
            <input
              type="number"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
            {errors.lng && <div className="error">{errors.lng}</div>}
          </div>
          <div className="form-item"></div> */}
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
