import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({ profile: { profiles, loading } }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProfiles())
    }, [dispatch])

    return (
        <>
            {
                loading ? <Spinner /> :
                    <>
                        <h1 className="large text-primary">Developers</h1>
                        <p className="lead">

                            <i className="fab fa-connectdevelop"></i> {' '}
                    Browse and connect with Developers
                    </p>
                        <div className="profiles">
                            {
                                profiles.length > 0 ?
                                    (
                                        profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
                                    ) :
                                    (
                                        <h4>No profiles found</h4>
                                    )
                            }
                        </div>
                    </>
            }
        </>
    )
}

Profiles.propTypes = {

}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps)(Profiles)
