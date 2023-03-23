import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../store/images";
import { useHistory } from "react-router-dom";
import "./AllImages.css";

const AllImages = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const images = useSelector((state) => state.images);
  let allProducts = images.allImages;

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

  allProducts = Object.values(allProducts);

  if (allProducts.length === 0) {
    return null;
  }
  console.log(images.allImages.images);

  function randomNumber() {
    return Math.random() * (15 - 5) + 5;
  }

  function randomHeight() {
    return Math.random() * (300 - 200) + 200;
  }
  function randomWidth() {
    return Math.random() * (400 - 200) + 200;
  }

  return (
    <>
      <div className="all-images-container">
        <div></div>
        <div className="images-container">
          {allProducts[0].map((product) => (
            <div
              className="image-card"
              key={product.id}
              onClick={() => history.push(`/images/${product.id}`)}
            >
              {/* <Link to={`/products/${product.id}`}> */}
              <div>
                {images.allImages.images.length > 0 ? (
                  <img
                    style={{
                      width: `${randomWidth()}px`,
                      height: `200px`,
                      borderRadius: "7px",
                      margin: "2px",
                      paddingTop: `1px`,
                    }}
                    src={product.url}
                    alt={product.name}
                  />
                ) : (
                  <img
                    style={{
                      width: "300px",
                      height: "250px",
                      borderRadius: "7px",
                      border: "2px solid white",
                    }}
                    src="https://i.imgur.com/6XK9X4u.png"
                    alt={product.name}
                  />
                )}
              </div>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllImages;
