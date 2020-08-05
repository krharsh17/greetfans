import React from 'react';
import {redirect} from '../../utils/redirect';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import DashboardHeader from '../../components/dashboardHeader';

class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: ''
    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  static async getInitialProps(context) {
    let profile = await API.makeRequest('get', '/api/profile')
    return {
      profile: profile,
    };
  }

  componentDidMount() {
    // TODO: Move this to a server side check
    if (!this.props.isAuthenticated) {
      redirect('/login');
    }
    let profile = this.props ? this.props.profile : {}
    this.setState({
      data: JSON.stringify(profile, null, 2)
    })
  }

  async handleUpdate() {
    if(JSON.parse(this.state.data))
    await API.makeRequest('post', '/api/profile/update', JSON.parse(this.state.data))
  }

  handleChange(ev) {
    this.setState({
      data: ev.target.value
    })
  }

  render() {
    let profile = this.props ? this.props.profile : {};
    let avatarUrl = profile ? profile.avatar : '/avatar.png';

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Profile"
      >
        <div className="profile">
          <h4>Your profile details</h4>
          <pre className="profile-details bg-light">
            <textarea style={{width: '100%', height: '240px'}} value={this.state.data} onChange={this.handleChange}/>
            <input type={'button'} onClick={this.handleUpdate} value={'Update'} />
          </pre>
        </div>
        <style jsx>{`
          .profile h4 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
          }

          .profile-details {
            padding: 10px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Profile;
