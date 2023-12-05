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
  const [lat, setLat] = useState(11);
  const [lng, setLng] = useState(11);
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [previewImageUrl, setPreviewImageUrl] = useState([]);
  const [tags, setTags] = useState([]);

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
  const apiKey = "acc_f59e4794d722ea0";
  const apiSecret = "1a079b7e446233993ad3ba49d18c07d9";

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setUrl(file);

      const reader = new FileReader();
      reader.onloadend = async () => {
        setPreviewImageUrl(reader.result); // Set the preview image URL

        try {
          // Convert the API key and secret to base64
          const base64Credentials = btoa(`${apiKey}:${apiSecret}`);

          // Upload the image to Imagga
          const formData = new FormData();
          formData.append("image", file);

          const uploadResponse = await fetch(
            "https://api.imagga.com/v2/uploads",
            {
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Basic ${base64Credentials}`,
              },
            }
          );

          if (!uploadResponse.ok) {
            throw new Error(
              `Failed to upload image: ${uploadResponse.statusText}`
            );
          }

          const uploadData = await uploadResponse.json();
          const uploadId = uploadData.result.upload_id;

          // Request tags for the uploaded image
          const tagsResponse = await fetch(
            `https://api.imagga.com/v2/tags?image_upload_id=${uploadId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Basic ${base64Credentials}`,
              },
            }
          );

          if (!tagsResponse.ok) {
            throw new Error(`Failed to fetch tags: ${tagsResponse.statusText}`);
          }

          const tagsData = await tagsResponse.json();
          const uniqueTags = Array.from(
            new Set(tagsData.result.tags.map((tag) => tag.tag.en))
          );
          const first8Tags = uniqueTags.slice(0, 8);

          // Now you can set your state or perform any other actions with first8Tags
          setTags(first8Tags);
          console.log(tags);
          console.log(tagsData);
        } catch (error) {
          console.error("Error:", error.message);
        }
      };

      reader.readAsDataURL(file);
    } else {
      setUrl("");
      setPreviewImageUrl(""); // Reset the preview image URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("url", url);
    formData.append("userId", userId);

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const data = await dispatch(createImage(formData));

      history.push(`/images/${data.id}`);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  return (
    <div className="create-image-container">
      <form
        className="create-image-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div></div>
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
            className="desc-new-image"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        <div className="form-item">
          {errors["url"] && <div className="error">{errors["url"]}</div>}
          <label>Select your Image</label>

          <input
            id="file"
            className="image-url-input"
            type="file"
            accept="image/*"
            name="url"
            onChange={(e) => {
              setUrl(e.target.files[0]);
              handleImageChange(e);
            }}
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
      <div className="preview-container">
        <div className="preview-box">
          <div className="preview-image-container">
            {previewImageUrl != "" ? (
              <img
                src={previewImageUrl}
                alt="Preview"
                className="preview-image"
              />
            ) : (
              <>
                <>
                  <div className="preview-image2"></div>
                </>
              </>
            )}
          </div>
          <div className="preview-image-name">
            {url.name == undefined ? (
              <>
                <div></div>
              </>
            ) : (
              `${url.name}`
            )}
          </div>
          <div className="tag-box">
            {tags.length > 0
              ? tags.map((tag) => (
                  <div key={tag} className="tag-button">
                    {tag}
                    <button
                      className="x-button"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      x
                    </button>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateImage;
