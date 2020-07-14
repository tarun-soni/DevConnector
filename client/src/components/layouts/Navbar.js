import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const Navbar = ({ auth: { isAuthenticated, isLoading } }) => {

  const dispatch = useDispatch()

  const logoutFunc = () => {
    dispatch(logout())
  }

  const authLinks = (
    <ul>
      <li>
        <a onClick={logoutFunc}
          href="#!">
          <i className="fas fa-sign-out-alt"></i>{'  '}
          <span className="hide-sm"> Logout </span>
        </a>
      </li>
    </ul >
  )
  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul >
  )


  return (
    <>
      <nav className="navbar bg-dark">
        <h1>
          <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
        </h1>

        {
          isLoading ? ' ' : (
            <>
              {isAuthenticated ? authLinks : guestLinks}
            </>
          )
        }

        {/* same thing if there is null is result of any conditions
        {
          !isLoading && (
            <>
              {isAuthenticated ? authLinks : guestLinks}
            </>
          )
        } */}
      </nav>
    </>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
