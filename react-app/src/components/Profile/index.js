import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getImagesByUser } from "../../store/images";
import DeleteImage from "../DeleteImage";
import { getAllUsers } from "../../store/session";
import "./Profile.css";

const missingImage = "https://i.imgur.com/6vKJZ0X.png";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userImages, setUserImages] = useState([]);
  const [imageId, setImageId] = useState(null);
  const loggedInUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.session.users);
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef(null);
  let user;
  const history = useHistory();

  const handleShowModal = (imageId) => {
    setShowModal(true);
    setImageId(imageId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const imagesByUser = await dispatch(getImagesByUser(id));
      const users = await dispatch(getAllUsers());
      console.log(imagesByUser);
      setUserImages(Object.values(imagesByUser));
      const user =
        users && users[0] && users[0].find((user) => user.id === parseInt(id));
    };
    fetchData();
    function handleCloseModal(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [dispatch, id]);

  if (allUsers === undefined) {
    return null;
  }

  if (userImages.length === 0) {
    return null;
  }

  const users = Object.values(allUsers);
  user = users[0].find((user) => user.id === parseInt(id));

  const images = userImages;
  console.log(images);

  if (images[0]?.length === 0) {
    return null;
  }

  console.log(loggedInUser.id === Number(id));

  return (
    <>
      {showModal && (
        <div ref={divRef} className="delete-product-modal">
          <DeleteImage setShowModal={setShowModal} imageId={imageId} />
        </div>
      )}
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-banner-container">
            <div className="profile-name"> {user.username} </div>
            <div className="follow-container">
              <div className="profile-follow">
                0 Followers &nbsp; • &nbsp;&nbsp;{" "}
              </div>

              <div className="profile-following">0 Following</div>
            </div>
          </h1>
        </div>
        <div className="profile-body">
          <div className="profile-info">
            <div className="profile-info-header">
              <h2 className="profile-info">Profile Info</h2>
            </div>
            <div className="profile-info-body">
              <div className="profile-info-body-left">
                <div className="profile-info-body-left-item">
                  <h3>Username</h3>
                  <p>{user.username}</p>
                </div>
                <div className="profile-info-body-left-item">
                  <h3>Email</h3>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="user-products-section">
                <div className="user-products-header">
                  <h2>My Images</h2>
                  {loggedInUser.id === Number(id) && (
                    <button
                      className="add-product-button"
                      onClick={() => history.push("/images/new")}
                    >
                      Add Image
                    </button>
                  )}
                  <div className="user-products-body">
                    {images[0].map((image) => (
                      <div className="user-product-card">
                        <div className="user-product-card-image">
                          {image[0] && (
                            <img
                              key={image.id}
                              style={{ width: "200px", height: "150px" }}
                              src={image[0].url}
                              alt={image.name}
                            />
                          )}
                        </div>
                        <div className="user-product-card-info">
                          <div className="user-product-card-info-top">
                            <h3>{image.name}</h3>
                            <p>{image.description}</p>
                            <p>{image.lat}</p>
                            <p>{image.lng}</p>
                          </div>
                          {loggedInUser.id === Number(id) && (
                            <div className="user-product-card-buttons">
                              <button
                                className="user-product-card-button"
                                onClick={() =>
                                  history.push(`/images/${image.id}/edit`)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="user-product-card-button"
                                onClick={() => handleShowModal(image.id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
