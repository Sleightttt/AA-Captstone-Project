import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleImage } from "../../store/images";
import { useParams, Link, useHistory } from "react-router-dom";
import "./SingleImage.css";
import {
  createLikeThunk,
  deleteLikeThunk,
  getLikesByImage,
  getLikesByUser,
} from "../../store/likes";
import {
  createFollowThunk,
  getFollowsByUser,
  deleteFollowThunk,
} from "../../store/followers";

//Single image component
const SingleImage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const image = useSelector((state) => state.images.singleImage);
  const userId = useSelector((state) => state?.session?.user?.id);
  const imageLikes = useSelector((state) => state.likes.imagesLikes);
  const userFollows = useSelector((state) => state.followers.userFollows);
  const userFollowsArr = Object?.values(userFollows);
  const imageLikesArr = Object?.values(imageLikes);
  const likeToDelete = imageLikesArr?.find((like) => like.liker_id == userId);
  const followToDelete = userFollowsArr?.find(
    (follow) =>
      follow.follower_id == userId && follow.following_id == image.owner?.id
  );
  const comments = useSelector(
    (state) => state?.comments?.SingleImagesComments
  );
  const [lke, setLke] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  //pulling store on load
  useEffect(() => {
    dispatch(getSingleImage(id));
    dispatch(getLikesByImage(id));
    dispatch(getLikesByUser(userId));
    dispatch(getFollowsByUser(userId));
  }, [dispatch, id]);

  //prerender protection
  if (image === undefined) {
    return null;
  }

  //toggles
  let thisOrThat = lke ? "unlike" : "like";

  const commentArr = Object?.values(comments).reverse();

  //// Need to refactor
  if (likeToDelete && !lke) likeToDelete ? setLke(true) : setLke(false);

  if (!likeToDelete && lke) likeToDelete ? setLke(true) : setLke(false);
  const deleter = likeToDelete?.id;

  if (followToDelete && !isFollowed)
    followToDelete ? setIsFollowed(true) : setIsFollowed(false);

  if (!followToDelete && isFollowed)
    followToDelete ? setIsFollowed(true) : setIsFollowed(false);
  /////

  // Action handlers
  const likeHandler = async (e) => {
    e.preventDefault();
    setLke(!lke);
    await dispatch(
      createLikeThunk({
        image_id: id,
        liker_id: userId,
      })
    );
    await dispatch(getLikesByImage(id));
    await dispatch(getLikesByUser(userId));
  };

  const unlikeHandler = async (e) => {
    e.preventDefault();
    setLke(!lke);
    await dispatch(deleteLikeThunk(deleter));
    await dispatch(getLikesByImage(id));
    await dispatch(getLikesByUser(userId));
  };

  const dateHandler = (date) => {
    let formatDate = new Date(date);
    let full = `${formatDate.toDateString()} `;

    return full;
  };

  const followHandler = async (e) => {
    e.preventDefault();
    if (!isFollowed) {
      await dispatch(
        createFollowThunk({
          follower_id: id,
          following_id: image.owner?.id,
        })
      );
      await dispatch(getFollowsByUser(userId));

      setIsFollowed(true);
    }
  };

  const unfollowHandler = async (e) => {
    e.preventDefault();

    if (isFollowed) {
      await dispatch(deleteFollowThunk(followToDelete?.id));

      await dispatch(getFollowsByUser(userId));

      setIsFollowed(false);
    }
  };

  return (
    <>
      <div className="single-product-container">
        <div className="back-button-container">
          <button className="back-button" onClick={() => history.goBack()}>
            <i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i> &nbsp;
            <span className="underline">Back to previous</span>
          </button>
        </div>
        <div className="image-container">
          <img alt="desciprtive" className="single-image" src={image.url}></img>
        </div>
      </div>
      <div className="user-card">
        <div className="product-info">
          <div className="user-name">
            <img
              alt="main placeholder"
              className="profile-img"
              src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
            ></img>

            <div className="single-product-name">{image.name}</div>
            <div className="likes-info">
              {/* {imageLikesArr?.length}{" "}
              {imageLikesArr?.length === 1 ? "Like " : "Likes"} */}
            </div>
            {lke ? (
              <form onSubmit={unlikeHandler}>
                <button className={thisOrThat}>
                  {" "}
                  <i className="fas fa-heart fa-3x"></i>
                </button>
              </form>
            ) : (
              <form onSubmit={likeHandler}>
                <button className={thisOrThat}>
                  <i className="far fa-heart fa-3x"></i>
                </button>
              </form>
            )}
          </div>

          <p className="image-desc">{image.description}</p>
          <div className="owner-info-row">
            <Link to={`/user/${image.owner?.id}`}>
              <div className="owner-link">Owner: {image.owner?.username}</div>
            </Link>

            {isFollowed ? (
              image.owner_id !== userId ? (
                <button className="unfollow-button" onClick={unfollowHandler}>
                  UNFOLLOW
                </button>
              ) : (
                ""
              )
            ) : image.owner_id !== userId ? (
              <button className="follow-button" onClick={followHandler}>
                FOLLOW
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="profile-follows-likes">
          <div className="views">
            <div className="box spaced"></div>
            <div className="box like-box">
              <div className="numbah">{imageLikesArr?.length}</div>
              <div className="grey">
                {" "}
                {imageLikesArr?.length === 1 ? "Like " : "Likes"}
              </div>{" "}
            </div>
            <div className="box">
              <div className="numbah">{commentArr.length}</div>
              <div className="grey">Comments</div>
            </div>
            <div className="taken-on">
              Taken on {dateHandler(image?.created_at)}
              <div>
                <i className=" space fa fa-copyright"></i> &nbsp;All rights
                reserved
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleImage;
