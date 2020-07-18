import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { connect, useDispatch } from "react-redux";
import Spinner from '../layouts/Spinner'
import { getProfileById } from '../../actions/profile'
import PropTypes from 'prop-types'
import ProfileTop from './ProfileTop'
const UserProfile = ({ match, profile: { profile, loading }, auth }) => {

    useEffect(() => {
        dispatch(getProfileById(match.params.id))
    }, [getProfileById])
    const dispatch = useDispatch()
    return (
        <>
            {profile === null || loading ? <Spinner /> :
                (
                    <>
                        <Link to='/profiles' className='btn btn-primary'>
                            Back to all profiles
                        </Link>

                        {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                            <Link to="/edit-profile" className='btn btn-dark'>
                                Edit Profile
                            </Link>}

                        <div class="profile-grid my-1">
                            <ProfileTop profile={profile} />
                        </div>
                    </>
                )}
        </>
    )
}

UserProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps)(UserProfile)
