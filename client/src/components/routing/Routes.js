import React from 'react'
import Login from '../auth/Login';
import Alert from '../layouts/Alert';
import Register from '../auth/Register'
import Dashboard from '../dashboard/Dashboard'
import CreateProfile from '../profile-forms/CreateProfile'
import EditProfile from '../profile-forms/EditProfile'
import AddExperience from '../profile-forms/AddExperience'
import AddEducation from '../profile-forms/AddEducation'
import Profiles from '../profiles/Profiles';
import UserProfile from '../user-profile/UserProfile';
import Posts from '../posts/Posts';
import Post from '../SinglePost/Post'
import PrivateRoute from './PrivateRoute'
import NotFound from '../layouts/NotFound';

import { Route, Switch } from 'react-router-dom'
const Routes = props => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={UserProfile} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
