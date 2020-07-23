import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { addComment } from '../../actions/post'

const CommentForm = ({ postId }) => {
  const [text, setText] = useState();
  const dispatch = useDispatch()
  return (

    <div className="post-form" >
      <div className="bg-primary p">
        <h3>Leave a comment...</h3>
      </div>
      <form className="form my-1"
        onSubmit={e => {
          e.preventDefault()
          dispatch(addComment(postId, { text }))
          setText('')
        }}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          // placeholder=""
          required
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>

  )
}

CommentForm.propTypes = {

}

export default connect(null)(CommentForm)
