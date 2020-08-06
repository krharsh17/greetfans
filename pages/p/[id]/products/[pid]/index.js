import React from 'react';
import API from '../../../../../helpers/api';
import PlatformNav from '../../../../../components/platformNav';
import PlatformLayout from '../../../../../components/platformLayout';

// Page for single product's details
export default class Product extends React.Component {

    // Fetching the platform & product details
    static async getInitialProps(context) {
        let platformSlug = context.query.id;

        let productSlug = context.query.pid;


        let platform = await API.makeRequest(
            'get',
            '/api/platforms/slug/' + platformSlug,
        );

        let products = await API.makeRequest(
            'get',
            '/api/products/platform/' + platformSlug,
        );


        products.map((elem) => {
            if (productSlug === elem.id)
                return elem
        })

        return {
            platform: platform,
            product: products[0],
        };
    }

    constructor() {
        super();

        this.buyProduct = this.buyProduct.bind(this)
    }

    async buyProduct(product, e) {
        e.preventDefault();

        try {
            let purchase = await API.makeRequest('post', '/api/purchase', {
                platformId: this.props.platform.platformId,
                priceId: product.price.id,
            });

            if (purchase.id) {
                const stripe = await this.stripePromise;
                stripe.redirectToCheckout({
                    sessionId: purchase.id,
                });
            }
        } catch (err) {
            console.log('error', err);
        }
    }

    render() {
        let price = '';

        if (this.props.product.price) {
            price = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.props.product.price.currency,
            }).format(this.props.product.price.unit_amount / 100);
        }
        return (
            <PlatformLayout
                isAuthenticated={this.props.isAuthenticated}
                userProfile={this.props.userProfile}
                platform={this.props.platform}
                title={'Products - ' + this.props.platform.name}
            >
                <div className="platform-products">
                    <div className="container-fluid">
                        <PlatformNav platform={this.props.platform}/>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 centered-div">
                                <h1>Product Description</h1>
                                <img src={this.props.product.images[0]}
                                     style={{
                                         objectFit: 'cover',
                                         width: '100%',
                                         height: '300px',
                                         marginBottom: '48px'
                                     }}/>

                                <h3>Name</h3>
                                <h2>{this.props.product.name}</h2>

                                <h3>Description</h3>
                                <h2>{this.props.product.description}</h2>

                                <h3>Price</h3>
                                <h2>{price}</h2>

                                <a
                                    href={"#"}
                                    target={"_blank"}
                                    className="btn btn-primary"
                                    onClick={(ev) => {
                                        this.buyProduct(this.props.product, ev)
                                    }}
                                >
                                    Buy now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
          .platform-products {
            width: 100%;
          }
          
          .centered-div {
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #1a1f36;
            padding: 0;
            margin: 0 auto 100px auto;

            text-align: center;
          }
          
          h2 {
            font-size: 20px;
            font-weight: bold;
            color: #1a1f36;
            padding: 0;
            margin: 0 auto 36px auto;
            text-align: center;
          }
          
          h3 {
            font-size: 16px;
            font-weight: bold;
            color: #1a1f36;
            padding: 0;

            text-align: center;
          }
        `}</style>
            </PlatformLayout>
        );
    }
}
