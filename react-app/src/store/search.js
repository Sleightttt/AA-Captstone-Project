const SEARCH = "likes/SEARCH";

const searchAction = (search) => ({
  type: SEARCH,
  payload: search,
});

export const createSearch = (searchTerm) => async (dispatch) => {
  try {
    const res = await fetch(`/api/search/${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const finalResponse = await res.json();
      dispatch(searchAction(finalResponse));
      return finalResponse;
    }
    throw new Error("Something went wrong when creating search");
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const initialState = { searchImages: [] };

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return { ...state, searchImages: action.payload };

    default:
      return state;
  }
}
