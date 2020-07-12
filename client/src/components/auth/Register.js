import React, { useState } from 'react'
import { Link } from 'react-router-dom';
//Redux
// import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'


const Register = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    const dispatch = useDispatch()

    const { name, email, password, password2 } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        if (password === password2) {
            dispatch(register({ name, email, password }))
        }
        else {
            //(msg, alert-type) **coz payload in alert action requires these params**
            // props.setAlert('Passwords dosent match', 'danger')
            dispatch(setAlert('Passwords do not match!', 'danger'))
        }
    }
    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"> <i className="fas fa-user"> </i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)} >
                <div className="form-group" >
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        // required
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                    // required
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        // minLength="6"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        // minLength="6"
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </>
    )
}

// Register.propTypes = {
//     setAlert: PropTypes.func.isRequired
// };

// export default connect(null, { setAlert })(Register);
export default Register




/*
do either one of them
1. export default connect(null, { setAlert })(Register);
2. import { connect } from 'react-redux'
3. add props
4. props.setAlert('Passwords dosent match', 'danger')

or

1. import { useDispatch } from 'react-redux'
2. const dispatch = useDispatch()
3. dispatch(setAlert('Passwords do not match!', 'danger'))
*/