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

const SingleImage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const image = useSelector((state) => state.images.singleImage);
  const userId = useSelector((state) => state.session.user.id);
  const userLikes = useSelector((state) => state.likes.userLikes);
  const imageLikes = useSelector((state) => state.likes.imagesLikes);
  const [lke, setLke] = useState(false);

  useEffect(() => {
    dispatch(getSingleImage(id));
    dispatch(getLikesByImage(id));
    dispatch(getLikesByUser(userId));
  }, [dispatch, id]);

  if (image === undefined) {
    return null;
  }

  const thisOrThat = lke ? "like" : "unlike";

  const likeHandler = async (e) => {
    e.preventDefault();
    console.log("hit likehandler", id);
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

  const imageLikesArr = Object?.values(imageLikes);
  const likeToDelete = imageLikesArr?.find((like) => like.liker_id == userId);

  console.log("like to delete", likeToDelete?.id);
  const deleter = likeToDelete?.id;

  const unlikeHandler = async (e) => {
    e.preventDefault();
    console.log("hit unlikehandler", id);
    setLke(!lke);
    await dispatch(deleteLikeThunk(deleter));
    await dispatch(getLikesByImage(id));
    await dispatch(getLikesByUser(userId));
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
      <div className="product-info">
        <div className="user-name">
          <img
            alt="main placeholder"
            className="profile-img"
            src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          ></img>

          <div className="single-product-name">{image.name}</div>
          <div>{imageLikesArr?.length}</div>
          {lke ? (
            <form onSubmit={unlikeHandler}>
              <button className={thisOrThat}>test</button>
            </form>
          ) : (
            <form onSubmit={likeHandler}>
              <button className={thisOrThat}>test</button>
            </form>
          )}
        </div>
        <p className="image-desc">{image.description}</p>
        <Link to={`/user/${image.owner?.id}`}>
          <div className="owner-link">Owner: {image.owner?.username}</div>
        </Link>
      </div>
    </>
  );
};

export default SingleImage;
