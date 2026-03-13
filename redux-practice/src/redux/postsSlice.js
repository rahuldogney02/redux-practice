// Action Types
export const POST_INCREMENT = 'posts/incrementPost';
export const CHANGE_NAME = 'posts/changeName';

// Action Creators
export const incrementPost = () => ({
  type: POST_INCREMENT,
});

export const changeName = () => ({
  type: CHANGE_NAME,
});

// Reducer
const initialState = {
  post: 23,
  name: "Rahul",
  age: 26,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_INCREMENT:
      // Return a new state object
      return {
        ...state,
        post: state.post + 1,
      };
    case CHANGE_NAME:
      // Return a new state object
      return {
        ...state,
        name: 'MANAS',
      };
    default:
      return state;
  }
};

export default postsReducer;