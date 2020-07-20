import React from 'react'
import PropTypes from 'prop-types'

const PostItem = ({ post }) => {

  return (
    // name
    // avatar
    // user
    // likes

    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            className="round-img"
            src={post.avatar}
            alt=""
          />
          <h4>{post.name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
          possimus corporis sunt necessitatibus! Minus nesciunt soluta
          suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
          dolor? Illo perferendis eveniet cum cupiditate aliquam?
      </p>
        <p className="post-date">
          Posted on 04/16/2019
      </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span>{post.likes}</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <a href="post.html" className="btn btn-primary">
          Discussion <span className='comment-count'>2</span>
        </a>
        <button
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>

  )
}

PostItem.propTypes = {

}

export default PostItem
