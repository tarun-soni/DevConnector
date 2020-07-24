import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { deleteComment } from '../../actions/post'
import Moment from 'react-moment'
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth
}) => {
  // const { _id, text, name, avatar, user, date } = comment;

  const dispatch = useDispatch()

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">
          {text}
        </p>
        <p className="post-date">
          Posted on
          <Moment format="DD/MM/YYYY" >
            {date}
          </Moment>
        </p>
        {!auth.loading && user === auth.user._id && (

          <button onClick={(e) =>
            dispatch(deleteComment(postId, _id))}
            type='button'
            className='btn btn-danger'
          >
            <i className="fas fa-times" />
          </button>
        )}

      </div>
    </div >
  )
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(CommentItem)
