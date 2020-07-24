import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../actions/types'

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
/*
UPDATE_LIKES
map throught the post for each post check to see if its the correct one.
 if it matches the payload.id (payload.id is the postId sent from payload)
 if it does,return all of the stuff in that post and just manipulate the likes
 if it dosent match the id, just return post
 */

/* REMOVE_COMMENT
posts state.
first,keep all the post in current state (...state.post)
comments is where we need to update
keep all the comments in the state - the selected comment(payload)
*/
