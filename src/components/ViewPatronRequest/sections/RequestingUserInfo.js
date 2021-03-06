import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../cards/user/UserCard';

import css from './RequestingUserInfo.css';

class RequestingUserInfo extends React.Component {
  static propTypes = {
    record: PropTypes.object,
    id: PropTypes.string,
  };

  render() {
    const { record } = this.props;

    const user = {
      id: record.patronIdentifier,
      username: undefined,
      personal: {
        lastName: record.patronSurname,
        firstName: record.patronGivenName,
        email: record.patronEmail,
      },
      patronGroupRecord: {
        group: undefined, // XXX
        desc: undefined, // XXX
      }
    };

    return (
      <UserCard
        id={`${this.props.id}-card`}
        user={user}
        cardClass={css.userCard}
        headerClass={css.userCardHeader}
      />
    );
  }
}

export default RequestingUserInfo;
