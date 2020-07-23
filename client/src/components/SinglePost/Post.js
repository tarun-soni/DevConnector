import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner'
import { connect, useDispatch } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';


const Post = ({ post: { post, loading }, match }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [getPost, match.params.id]);

  return (
    loading || post === null ? (<Spinner />) : (
      <>
        <Link to='/posts' className='btn'>Back to All posts</Link>
        <PostItem post={post} showActions={false} />

        <CommentForm postId={post._id} />

        <div className="comments">
          <h4>comments</h4>
          {
            post.comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
      </>
    ))
}



Post.propTypes = {
  post: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps)(Post);

