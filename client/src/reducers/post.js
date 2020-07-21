import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../actions/types'

const initialState = {
  post: [],
  posts: null,
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
          post.id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    default:
      return state;
  }
}
/*
map throught the post for each post check to see if its the correct one.
 if it matches the payload.id (payload.id is the postId sent from payload)
 if it does,return all of the stuff in that post and just manipulate the likes
 if it dosent match the id, just return post
 */