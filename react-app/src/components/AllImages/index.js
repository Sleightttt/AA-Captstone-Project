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
      <div className="all-products-container">
        <div></div>
        <div className="products-container">
          {allProducts[0].map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => history.push(`/products/${product.id}`)}
            >
              {/* <Link to={`/products/${product.id}`}> */}
              <div>
                {images.allImages.length > 0 ? (
                  <img
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "7px",
                    }}
                    src={product.images[0].url}
                    alt={product.name}
                  />
                ) : (
                  <img
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "7px",
                    }}
                    src="https://i.imgur.com/6XK9X4u.png"
                    alt={product.name}
                  />
                )}

                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-reviews">Reviews go here</div>
                  <p className="price">${product.price}</p>
                  <p className="product-description">{product.description}</p>
                </div>
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
