import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileEducation = (props) => {

  const { school, degree, fieldofstudy, current, to, from, description } = props.education
  return (
    <>
      <h3>{school}</h3>
      <p>

        <Moment format="DD/MM/YYYY">
          {moment.utc(from)}
        </Moment> -{' '}

        {!to ? ' Now' :
          <Moment format="DD/MM/YYYY">
            {moment.utc(to)}
          </Moment>}

      </p>
      <p><strong>Degree: </strong>{degree}</p>
      <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
      <p>
        <strong>Description: </strong>{description}
      </p>
    </>
  );
}

export default ProfileEducation;
