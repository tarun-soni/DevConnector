import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { addComment } from '../../actions/post'
import Moment from 'react-moment'
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  // const { _id, text, name, avatar, user, date } = comment;

  const dispatch = useDispatch()

  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            class="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">
          {text}
        </p>
        <p class="post-date">
          Posted on
          <Moment format="DD/MM/YYYY"
          >
            {date}
          </Moment>
        </p>
      </div>
    </div>
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
