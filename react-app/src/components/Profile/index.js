import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getImagesByUser } from "../../store/images";
import DeleteImage from "../DeleteImage";
import { getAllUsers } from "../../store/session";
import "./Profile.css";
import {
  getAllFollowsThunk,
  createFollowThunk,
  deleteFollowThunk,
} from "../../store/followers";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userImages, setUserImages] = useState([]);
  const [imageId, setImageId] = useState(null);
  const loggedInUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.session.users);
  const allFollows = useSelector((state) => state.followers.follows);
  const userId = useSelector((state) => state?.session?.user?.id);
  const userFollows = useSelector((state) => state.followers.userFollows);
  const userFollowsArr = Object?.values(userFollows);
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef(null);
  let user;
  const history = useHistory();
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersDropdownVisible, setFollowersDropdownVisible] =
    useState(false);
  const [followingDropdownVisible, setFollowingDropdownVisible] =
    useState(false);
  const followToDelete = userFollowsArr?.find(
    (follow) => follow.follower_id == userId && follow.following_id == id
  );

  if (followToDelete && !isFollowed)
    followToDelete ? setIsFollowed(true) : setIsFollowed(false);

  if (!followToDelete && isFollowed)
    followToDelete ? setIsFollowed(true) : setIsFollowed(false);

  const handleShowModal = (imageId) => {
    setShowModal(true);
    setImageId(imageId);
  };

  const toggleFollowersDropdown = () => {
    setFollowersDropdownVisible(!followersDropdownVisible);
    setFollowingDropdownVisible(false); // Close the other dropdown
  };

  const toggleFollowingDropdown = () => {
    setFollowingDropdownVisible(!followingDropdownVisible);
    setFollowersDropdownVisible(false); // Close the other dropdown
  };

  useEffect(() => {
    const fetchData = async () => {
      const imagesByUser = await dispatch(getImagesByUser(id));
      await dispatch(getAllFollowsThunk());
      const users = await dispatch(getAllUsers());
      setUserImages(Object.values(imagesByUser));
      const user =
        users && users[0] && users[0].find((user) => user.id === parseInt(id));
    };
    fetchData();

    const handleCloseModal = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    const handleDropdownClickOutside = (event) => {
      if (
        !event.target.closest(".followers-dropdown") &&
        !event.target.closest(".following-dropdown")
      ) {
        setFollowersDropdownVisible(false);
        setFollowingDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleCloseModal);
    document.addEventListener("mousedown", handleDropdownClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
      document.removeEventListener("mousedown", handleDropdownClickOutside);
    };
  }, [dispatch, id, followersDropdownVisible, followingDropdownVisible]);
  const caller = async () => {
    const users = await dispatch(getAllUsers());
    const imagesByUser = await dispatch(getImagesByUser(id));
  };

  if (allUsers === undefined) {
    caller();
    return (
      <div className="spinner">
        <i className="fas fa-spinner"></i>
      </div>
    );
  }

  if (userImages.length === 0) {
    return (
      <div className="spinner">
        <i className="fas fa-spinner"></i>
      </div>
    );
  }

  const users = Object.values(allUsers);
  user = users[0].find((user) => user.id === parseInt(id));

  const images = userImages ? userImages : "";

  let profileFollows;
  let profileFollowers;

  profileFollows = allFollows["follows"].filter(
    (follow) => follow.follower_id == id
  );

  profileFollowers = allFollows["follows"].filter(
    (follow) => follow.following_id == id
  );

  let myProfileFollows = allFollows.follows.filter(
    (follow) => follow.follower_id == userId
  );

  const myProfile = userId == id;

  const followButtonHandler = async () => {
    //unfollow
    if (isFollowed) {
      await dispatch(deleteFollowThunk(followToDelete?.id));

      const fetchData = async () => {
        const imagesByUser = await dispatch(getImagesByUser(id));
        await dispatch(getAllFollowsThunk());
        const users = await dispatch(getAllUsers());
        setUserImages(Object.values(imagesByUser));
        const user =
          users &&
          users[0] &&
          users[0].find((user) => user.id === parseInt(id));
      };
      fetchData();

      setIsFollowed(false);
    } else {
      //follow
      await dispatch(
        createFollowThunk({
          follower_id: userId,
          following_id: id,
        })
      );
      await dispatch(getAllFollowsThunk());
      setIsFollowed(true);
    }
  };

  const divClickHandler = (e) => {
    e.preventDefault();
    history.push(`/users/${e}`);
  };

  if (images[0]?.length === 0) {
    return (
      <>
        <div className="profile-container">
          <div className="profile-header">
            <h1 className="profile-banner-container">
              <div className="profile-name"> {user.username}</div>
              <div className="follow-container">
                <div className="profile-follow">
                  <div onClick={toggleFollowersDropdown}>
                    {profileFollowers?.length} Followers
                    {followersDropdownVisible && (
                      <div className="followers-dropdown">
                        {/* Render the list of follower usernames here */}
                        {profileFollowers.map((follower) => {
                          const foundUser = users[0].find(
                            (user) =>
                              user.id == parseInt(follower.follower_id, 10)
                          );
                          return (
                            <div
                              onClick={() => {
                                history.push(`/user/${foundUser.id}`);
                              }}
                              key={follower.id}
                            >
                              {foundUser ? foundUser.username : "Unknown User"}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                &nbsp;
                <div className="profile-following">
                  <div onClick={toggleFollowingDropdown}>
                    {profileFollows?.length} Following
                    {followingDropdownVisible && (
                      <div className="following-dropdown">
                        {/* Render the list of following usernames here */}
                        {profileFollows.map((follower) => {
                          const foundUser = users[0].find(
                            (user) =>
                              user.id == parseInt(follower.following_id, 10)
                          );
                          return (
                            <div
                              onClick={() => {
                                history.push(`/user/${foundUser.id}`);
                              }}
                              key={follower.id}
                            >
                              {foundUser ? foundUser.username : "Unknown User"}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                {isFollowed ? (
                  id !== userId && loggedInUser.id !== Number(id) ? (
                    <button
                      className="unfollow-button"
                      onClick={followButtonHandler}
                    >
                      Unfollow
                    </button>
                  ) : (
                    ""
                  )
                ) : id !== userId && loggedInUser.id !== Number(id) ? (
                  <button
                    className="follow-button"
                    onClick={followButtonHandler}
                  >
                    Follow
                  </button>
                ) : (
                  ""
                )}
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
                    {id !== userId && loggedInUser.id !== Number(id) ? (
                      ""
                    ) : (
                      <div className="try">
                        {" "}
                        <i className="fas fa-angle-up fa-bounce "></i>&nbsp; Get
                        started!
                      </div>
                    )}

                    <div
                      className="user-images-body"
                      style={{
                        height: "500px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <div className="such-empty">No photos uploaded yet!</div>
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
            <div className="profile-name">{user.username} </div>
            <div className="follow-container">
              <div className="profile-follow">
                <div onClick={toggleFollowersDropdown}>
                  {profileFollowers?.length} Followers
                  {followersDropdownVisible && (
                    <div className="followers-dropdown">
                      {/* Render the list of follower usernames here */}
                      {profileFollowers.map((follower) => {
                        const foundUser = users[0].find(
                          (user) =>
                            user.id == parseInt(follower.follower_id, 10)
                        );
                        return (
                          <div
                            onClick={() => {
                              history.push(`/user/${foundUser.id}`);
                            }}
                            key={follower.id}
                          >
                            {foundUser ? foundUser.username : "Unknown User"}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              &nbsp;
              <div className="profile-following">
                <div onClick={toggleFollowingDropdown}>
                  {profileFollows?.length} Following
                  {followingDropdownVisible && (
                    <div className="following-dropdown">
                      {profileFollows.map((follower) => {
                        const foundUser = users[0].find(
                          (user) =>
                            user.id == parseInt(follower.following_id, 10)
                        );
                        return (
                          <div
                            onClick={() => {
                              history.push(`/user/${foundUser.id}`);
                            }}
                            key={follower.id}
                          >
                            {foundUser ? foundUser.username : "Unknown User"}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              {isFollowed ? (
                id !== userId && loggedInUser.id !== Number(id) ? (
                  <button
                    className="unfollow-button"
                    onClick={followButtonHandler}
                  >
                    Unfollow
                  </button>
                ) : (
                  ""
                )
              ) : id !== userId && loggedInUser.id !== Number(id) ? (
                <button className="follow-button" onClick={followButtonHandler}>
                  Follow
                </button>
              ) : (
                ""
              )}
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
