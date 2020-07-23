import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { getPosts } from '../../actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm'


const Posts = ({ post: { posts, loading } }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [getPosts])

  return loading ? <Spinner /> :
    (
      <>
        <h1 className="large text-primary">
          Posts
      </h1>
        <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>


        <PostForm />
        <div className="posts">
          {
            posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))
          }
        </div>
      </>
    )
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps)(Posts);

