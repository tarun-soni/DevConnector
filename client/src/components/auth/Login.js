import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
//redux
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layouts/Spinner'

const Login = ({ isAuthenticated }) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        dispatch(login(formData))
    }

    //redirect if authenticated 
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"> <i className="fas fa-user"> </i> Sign In to your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)} >
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />

                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
        </>
    )
}



// Login.propTypes = {
//     login: PropTypes.func.isRequired,
//     isAuthenticated: PropTypes.bool
// };
Login.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

// export default connect(mapStateToProps, { login })(Login);
export default connect(mapStateToProps)(Login);


/*
either use commented lines and add {login} in props
or use the current method using useDispatch HOOK
*/