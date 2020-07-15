import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'

import { getCurrentProfile } from '../../actions/profile'

const Dashboard = ({ auth, profile }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [])
    return (
        <div>
            Dashboard
        </div>
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
