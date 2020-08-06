import {Component} from 'react';
import API from '../helpers/api';
import logger from '../helpers/logger';
import {redirect} from '../utils/redirect';

// Settings update form for the dashboard
class DashboardPlatformSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.platform,
        };

        // Updated this to enable the form inputs
        this.isFormDisabled = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            let req = await API.makeRequest(
                'put',
                `/api/platforms/${this.state.platformId}`,
                this.state,
            );
            return redirect('/dashboard/settings');
        } catch (err) {
            logger.log('Settings save failed.', err);
        }
    }

    render() {
        return (
            <>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Platform name</label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                placeholder=""
                                value={this.state.name}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Platform url</label>
                            <input
                                className="form-control"
                                type="text"
                                // disabled
                                value={'http://roastey.com/p/' + this.state.slug}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Address</label>
                            <input
                                className="form-control"
                                type="text"
                                id="address"
                                name="address"
                                placeholder=""
                                value={this.state.address}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">City</label>
                            <input
                                className="form-control"
                                type="text"
                                id="city"
                                name="city"
                                placeholder=""
                                value={this.state.city}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Zip</label>
                            <input
                                className="form-control"
                                type="text"
                                id="zip"
                                name="zip"
                                placeholder=""
                                value={this.state.zip}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">State</label>
                            <input
                                className="form-control"
                                type="text"
                                id="state"
                                name="state"
                                placeholder=""
                                value={this.state.state}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Platform description</label>
                            <textarea
                                className="form-control"
                                type="text"
                                id="description"
                                name="description"
                                placeholder=""
                                value={this.state.description}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">TEL</label>
                            <input
                                className="form-control"
                                type="text"
                                id="tel"
                                name="tel"
                                placeholder=""
                                value={this.state.tel}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Available Timings</label>
                            <input
                                className="form-control"
                                type="text"
                                id="timings"
                                name="timings"
                                placeholder=""
                                value={this.state.timings}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Support Email</label>
                            <input
                                className="form-control"
                                type="text"
                                id="email"
                                name="email"
                                placeholder=""
                                value={this.state.email}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Platform Logo</label>
                            <input
                                className="form-control"
                                type="text"
                                id="platformLogo"
                                name="platformLogo"
                                placeholder=""
                                value={this.state.platformLogo}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Cover Picture</label>
                            <input
                                className="form-control"
                                type="text"
                                id="coverURL"
                                name="coverURL"
                                placeholder=""
                                value={this.state.coverURL}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Tagline</label>
                            <input
                                className="form-control"
                                type="text"
                                id="tagline"
                                name="tagline"
                                placeholder=""
                                value={this.state.tagline}
                                disabled={this.isFormDisabled}
                                onChange={this.handleChange}
                            />
                        </div>

                        <button type="submit" className="btn-submit btn btn-primary">
                            Update settings{' '}
                            {this.isFormDisabled ? '(disabled in test mode)' : ''}
                        </button>

                        <p className={`error ${this.state.error && 'show'}`}>
                            {this.state.error && `Error: ${this.state.error}`}
                        </p>
                    </form>
                </div>
                <style jsx>{`
          .form {
            margin: 0;
          }

          label {
            font-weight: 600;
          }

          input {
            padding-left: 12px;
          }

          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }
          .error.show {
            display: block;
          }

          .btn-submit {
            margin-top: 20px;
          }
        `}</style>
            </>
        );
    }
}

export default DashboardPlatformSettings;
