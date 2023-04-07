import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getImagesByUser } from "../../store/images";
import DeleteImage from "../DeleteImage";
import { getAllUsers } from "../../store/session";
import "./Profile.css";
import { getAllFollowsThunk } from "../../store/followers";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userImages, setUserImages] = useState([]);
  const [imageId, setImageId] = useState(null);

  const loggedInUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.session.users);
  const allFollows = useSelector((state) => state.followers.follows);
  const userId = useSelector((state) => state?.session?.user?.id);
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
      await dispatch(getAllFollowsThunk());
      const users = await dispatch(getAllUsers());
      // console.log(imagesByUser);
      setUserImages(Object.values(imagesByUser));
      const user =
        users && users[0] && users[0].find((user) => user.id === parseInt(id));
    };
    fetchData();
    // console.log(profileFollows, "follows");
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

  const caller = async () => {
    const users = await dispatch(getAllUsers());
    const imagesByUser = await dispatch(getImagesByUser(id));
    console.log("----", users);
  };

  if (allUsers === undefined) {
    caller();
    return <div>Render fell asleep, please wait</div>;
  }

  if (userImages.length === 0) {
    return <div>Render fell asleep, please wait</div>;
  }

  const users = Object.values(allUsers);
  user = users[0].find((user) => user.id === parseInt(id));

  const images = userImages ? userImages : "";
  // console.log(images);
  let profileFollows;
  let profileFollowers;

  // if (allFollows.follows) {
  //   profileFollows = Object.values(allFollows.follows).filter(
  //     (follow) => follow.following_id === id
  //   );
  // }

  console.log(allFollows["follows"], "allfollows");

  profileFollows = allFollows["follows"].filter(
    (follow) => follow.follower_id == id
  );

  console.log("bobbies follows", profileFollows?.length, profileFollows);

  profileFollowers = allFollows["follows"].filter(
    (follow) => follow.following_id == id
  );

  console.log("bobbies followers", profileFollowers?.length, profileFollowers);

  let myProfileFollows = allFollows.follows.filter(
    (follow) => follow.follower_id == userId
  );
  console.log("my profile follows", myProfileFollows);

  let myProfileFollowers = allFollows.follows.filter(
    (follow) => follow.following_id == userId
  );
  console.log(profileFollowers, "profile followers");

  // console.log(myProfileFollows.length, "following length");
  // console.log(myProfileFollowers.length, "folllowers length");
  // console.log(Object.values(allFollows.follows));

  const myProfile = userId == id;

  if (images[0]?.length === 0) {
    return (
      <>
        <div className="profile-container">
          <div className="profile-header">
            <h1 className="profile-banner-container">
              <div className="profile-name"> {user.username} </div>
              <div className="follow-container">
                <div className="profile-follow">
                  &nbsp;
                  {myProfile
                    ? profileFollowers?.length
                    : profileFollows?.length}{" "}
                  Followers • &nbsp;&nbsp;{" "}
                </div>

                <div className="profile-following">
                  {myProfile
                    ? myProfileFollows?.length
                    : profileFollows?.length}{" "}
                  Following
                </div>
              </div>
            </h1>
          </div>
          <div className="profile-body">
            <div className="info-profile">
              <div className="profile-info-header"></div>
              <div className="profile-info-body">
                <div className="profile-info-body-left"></div>
                <div className="user-products-section">
                  <div className="user-products-header">
                    <div className="your-images"></div>
                    {loggedInUser.id === Number(id) && (
                      <button
                        className="add-image-button"
                        onClick={() => history.push("/images/new")}
                      >
                        Add New Image
                      </button>
                    )}
                    <div className="user-images-body">
                      {images[0].map((image) => (
                        <div key={image.id} className="user-product-card">
                          <div className="user-image">
                            {image && (
                              <>
                                <img
                                  className="profile-image-hover"
                                  key={image.id}
                                  style={{ width: "400px", height: "400px" }}
                                  src={image.url}
                                  alt={image.name}
                                  onClick={() =>
                                    history.push(`/images/${image.id}`)
                                  }
                                />
                                <div className="img__description_layer">
                                  {loggedInUser.id === Number(id) && (
                                    <div className="user-product-card-buttons">
                                      <button
                                        className="user-image-card-button"
                                        onClick={() =>
                                          history.push(
                                            `/images/${image.id}/edit`
                                          )
                                        }
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="user-image-card-button"
                                        onClick={() =>
                                          handleShowModal(image.id)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="user-product-card-info"></div>
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
  }

  // console.log(loggedInUser.id === Number(id));

  // console.log(showModal);

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
                {myProfile
                  ? profileFollowers?.length
                  : profileFollowers?.length}
                &nbsp;Followers • &nbsp;&nbsp;{" "}
              </div>

              <div className="profile-following">
                {" "}
                {myProfile
                  ? myProfileFollows?.length
                  : profileFollows?.length}{" "}
                Following
              </div>
            </div>
          </h1>
        </div>
        <div className="profile-body">
          <div className="info-profile">
            <div className="profile-info-header"></div>
            <div className="profile-info-body">
              <div className="profile-info-body-left"></div>
              <div className="user-products-section">
                <div className="user-products-header">
                  <div className="your-images"></div>
                  {loggedInUser.id === Number(id) && (
                    <button
                      className="add-image-button"
                      onClick={() => history.push("/images/new")}
                    >
                      Add New Image
                    </button>
                  )}
                  <div className="user-images-body">
                    {images[0].map((image) => (
                      <div key={image.id} className="user-product-card">
                        <div className="user-image">
                          {image && (
                            <>
                              <img
                                className="profile-image-hover"
                                key={image.id}
                                style={{ width: "400px", height: "400px" }}
                                src={image.url}
                                alt={image.name}
                                onClick={() =>
                                  history.push(`/images/${image.id}`)
                                }
                              />
                              <div className="img__description_layer">
                                {loggedInUser.id === Number(id) && (
                                  <div className="user-product-card-buttons">
                                    <button
                                      className="user-image-card-button"
                                      onClick={() =>
                                        history.push(`/images/${image.id}/edit`)
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="user-image-card-button"
                                      onClick={() => handleShowModal(image.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="user-product-card-info"></div>
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
