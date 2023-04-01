import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleImage } from "../../store/images";
import { useParams, Link, useHistory } from "react-router-dom";
import "./SingleImage.css";
import { createLikeThunk } from "../../store/likes";

const SingleImage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const image = useSelector((state) => state.images.singleImage);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getSingleImage(id));
  }, [dispatch, id]);

  if (image === undefined) {
    return null;
  }
  console.log("this is id", id);

  const likeHandler = async (e) => {
    e.preventDefault();
    console.log("hit likehandler", id);
    await dispatch(
      createLikeThunk({
        image_id: id,
        liker_id: userId,
      })
    );
  };

  // const unlikeHandler = async (e) => {
  //   e.preventDefault();
  //   console.log("hit likehandler", id);
  //   await dispatch(
  //     deleteLikeThunk({
  //
  //     )
  //   );
  // };

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
          <form onSubmit={likeHandler}>
            <button className="liketest">test</button>
          </form>
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
