import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import DashboardActions from './DashboardActions'

import { getCurrentProfile } from '../../actions/profile'

import Spinner from '../layouts/Spinner'
const Dashboard = ({ auth: { user }, profile: { profile, loading } }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [])


    return loading && profile === null ? <Spinner /> : (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fa fa-user"></i>
                <span>            </span>
                Welcome {user && user.name}
            </p> {/* if user exists? print user.name */}


            {profile !== null ?
                <> <DashboardActions />  </>
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
