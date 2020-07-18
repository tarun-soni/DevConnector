import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'

import Spinner from '../layouts/Spinner'
const Dashboard = ({ auth: { user }, profile: { profile, loading } }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [dispatch])


    return loading && profile === null ? <Spinner /> : (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fa fa-user"></i>
                <span>            </span>
                Welcome {user && user.name}
            </p> {/* if user exists? print user.name */}


            {profile !== null ?
                <> <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div className="my-2">

                        <button className="btn btn-danger"
                            onClick={() => dispatch(deleteAccount())}
                        >
                            <i className="fas fa-usesr-minus"></i>
                            Delete My Account
                        </button>

                    </div>
                </>
                :
                <>
                    <p>You have not yet setup a profile, please add some info. </p>
                    <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
                </>}
        </>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps)(Dashboard)
