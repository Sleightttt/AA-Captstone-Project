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
  console.log(images.allImages);

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
                {images.allImages.length > 0 ? (
                  <img
                    style={{
                      width: "200px",
                      height: "250px",
                      borderRadius: "7px",
                    }}
                    src={product.images[0].url}
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
