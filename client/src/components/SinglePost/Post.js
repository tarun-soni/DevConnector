import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner'
import Moment from 'react-moment';
import { connect, useDispatch } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';

const Post = ({ post: { post, loading }, match }) => {
  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [getPost, match.params.id]);

  const dispatch = useDispatch()
  return loading || post === null ? <Spinner /> :
    <>
      <Link to='/posts' className='btn'>Back to All posts</Link>
      <PostItem post={post} showActions={false} />
    </>
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps)(Post)
