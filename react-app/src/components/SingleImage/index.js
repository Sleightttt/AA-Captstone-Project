import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleImage } from "../../store/images";
import { useParams, Link } from "react-router-dom";
import "./SingleImage.css";

const SingleImage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const image = useSelector((state) => state.images.singleImage);
  const currUser = useSelector((state) => state?.session?.user);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    dispatch(getSingleImage(id));
  }, [dispatch, id]);

  if (image === undefined) {
    return null;
  }

  //   const maxAvailable = [];
  //   for (let i = 1; i <= product.quantity; i++) {
  //     maxAvailable.push(i);
  //   }

  //   const quantityUpdate = (e) => {
  //     setQuantity(e.target.value);
  //   };

  //   const addCartClick = async (e) => {
  //     e.preventDefault();

  //     const data = {
  //       user_id: currUser.id,
  //       product_id: product.id,
  //       quantity: quantity,
  //     };
  //     console.log("item to be added", data);
  //     await dispatch(addItemToCart(data));
  //   };

  //   const disableButton = () => {
  //     if (!currUser) {
  //       return true;
  //     }
  //   };

  return (
    <div className="single-product-container">
      <div className="images-row"></div>
      <div className="product-info">
        <h3 className="single-product-name">{image.name}</h3>
        <p>{image.description}</p>
        <p className="single-product-price">${image.lat}</p>
        <Link to={`/user/${image.owner?.id}`}>
          <p>Owner: {image.owner?.username}</p>
        </Link>
      </div>
    </div>
  );
};

export default SingleImage;
