import React from 'react';
import Layout from '../components/layout';
import StripeBanner from '../components/stripeBanner';
import LoginComponent from '../components/loginForm';
import FirebaseAuth from "../components/firebaseAuth";

// Login page with login form
// Also used for signing in through 3rd party providers & onboarding through signup form
export default class LoginPage extends React.Component {
    render() {
        return (
            <Layout
                isAuthenticated={this.props.isAuthenticated}
                userProfile={this.props.userProfile}
                isSplashPage="true"
            >
                <div className="login-page center-center">
                    <div className="container">
                        <div className="box popover">
                            <h1>Sign in</h1>
                            <LoginComponent/>
                            <FirebaseAuth/>
                        </div>
                    </div>

                    <StripeBanner/>
                </div>
                <style jsx>{`
          .login-page {
          }
        `}</style>
            </Layout>
        );
    }
}
