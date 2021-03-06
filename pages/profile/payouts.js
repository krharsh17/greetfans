import React from 'react';
import Layout from '../../components/layout';
import PayoutSetup from '../../components/payoutSetup';

// Landing for payouts page
class ProfilePayouts extends React.Component {
    constructor() {
        super();
    }

    render() {
        let hasPayoutSetup =
            this.props.userProfile &&
            this.props.userProfile.stripe != null &&
            this.props.userProfile.stripe.stripeUserId;

        return (
            <Layout
                isAuthenticated={this.props.isAuthenticated}
                userProfile={this.props.userProfile}
                isSplashPage="true"
            >
                <div className="content center-center">
                    <div className="box popover">
                        {hasPayoutSetup ? (
                            <a
                                href="#"
                                className="btn btn-primary"
                                onClick={this.handleDashboardLink}
                            >
                                Go to Stripe Dashboard
                            </a>
                        ) : (
                            <PayoutSetup/>
                        )}
                    </div>
                </div>
                <style jsx>{`

        `}</style>
            </Layout>
        );
    }
}

export default ProfilePayouts;
