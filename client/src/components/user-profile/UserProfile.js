import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { connect, useDispatch } from "react-redux";
import Spinner from '../layouts/Spinner'
import { getProfileById } from '../../actions/profile'
import PropTypes from 'prop-types'
import ProfileTop from './ProfileTop'
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
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
                            <ProfileAbout profile={profile} />

                            <div className="profile-exp bg-white p-2">
                                <h2 className="text-primary">Experience</h2>
                                {
                                    profile.experience.length > 0 ?
                                        (<>
                                            {profile.experience.map(exp => (
                                                <ProfileExperience key={exp._id} experience={exp} />
                                            ))}

                                        </>) :
                                        (<h2> No Experience Credentials found</h2>)
                                }

                            </div>

                            <div className="profile-edu bg-white p-2">
                                <h2 className="text-primary">Education</h2>
                                {
                                    profile.education.length > 0 ?
                                        (<>
                                            {profile.education.map(edu => (
                                                <ProfileEducation key={edu._id} education={edu} />
                                            ))}

                                        </>) :
                                        (<h2> No Education Credentials found</h2>)
                                }

                            </div>
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
