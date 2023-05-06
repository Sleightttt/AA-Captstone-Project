import "./Search.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearch } from "../../store/search";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Search() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [arr, setArr] = useState([]);
  const searchResults = useSelector((state) => state.search?.searchResults);

  useEffect(() => {
    const updateFields = async () => {
      const searchResults = await dispatch(createSearch(search));
      //   console.log(searchResults);
      setArr(Object.values(searchResults));
    };

    updateFields();
  }, [dispatch]);

  //   console.log(arr);

  if (arr?.length === 0) {
    // console.log("oooooo");
    return (
      <>
        <div className="such-empty">
          <div className="results">
            {" "}
            {`No results for '${search}'. Try Again?`}
          </div>
        </div>
      </>
    );
  }

  if (arr[0])
    if (arr[0]?.length === 0) {
      //   console.log("oooooo");
      return (
        <>
          <div className="such-empty">
            <div className="results">
              {" "}
              {`No results for '${search}'. Try Again?`}
            </div>
          </div>
        </>
      );
    }

  return (
    <>
      <div className="wow">
        <div className="res-num">
          {arr.length > 1
            ? `${arr[0].length} results for '${search}'`
            : `${arr[0].length} results for '${search}'`}
        </div>
        <div className="images-container">
          {arr[0]?.map((image) => (
            <div
              className="image-card"
              key={image.id}
              onClick={() => history.push(`/images/${image.id}`)}
            >
              {/* {console.log(arr)} */}
              <div>
                <img className="big" src={image.url} alt={image.name} />
              </div>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
