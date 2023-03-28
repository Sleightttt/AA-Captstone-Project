import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../store/images";
import { useHistory } from "react-router-dom";
import "./AllImages.css";

const AllImages = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const images = useSelector((state) => state.images);
  let allImg = images.allImages;

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

  allImg = Object.values(allImg);

  if (allImg.length === 0) {
    return null;
  }
  // console.log(images.allImages.images);

  function randomWidth() {
    return Math.random() * (400 - 200) + 200;
  }

  return (
    <>
      <div className="all-images-container">
        <div></div>
        <div className="images-container">
          {allImg[0].map((image) => (
            <div
              className="image-card"
              key={image.id}
              onClick={() => history.push(`/images/${image.id}`)}
            >
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
                    src={image.url}
                    alt={image.name}
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
                    alt={image.name}
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
