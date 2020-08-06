import React from 'react';
import Layout from '../components/layout';
import SignupForm from '../components/signupForm';
import StripeBanner from '../components/stripeBanner';

// Signup page with signup form
// This is also used to onboard a user signed in through a 3rd party provider
class Signup extends React.Component {

    render() {
        return (
            <Layout
                isAuthenticated={this.props.isAuthenticated}
                userProfile={this.props.userProfile}
                title="Signup"
                isSplashPage="true"
            >
                <div className="page-signup center-center">
                    <div className="box popover">
                        <h1>Create platform</h1>
                        <p className="supporting-text">
                            Create a new platform, or sign in with a{' '}
                            <a href="/login">demo account</a>
                        </p>
                        <SignupForm/>
                    </div>
                    <StripeBanner/>
                </div>
                <style jsx>{`
          .page-signup {
          }
        `}</style>
            </Layout>
        );
    }
}

export default Signup;
