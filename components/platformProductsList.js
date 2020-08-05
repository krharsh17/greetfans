import {loadStripe} from '@stripe/stripe-js';
import getConfig from 'next/config';

let publicKey = getConfig().publicRuntimeConfig.stripe.publicKey;

export default class PlatformProductsList extends React.Component {
    constructor(props) {
        super();
        this.props = props;

        this.stripePromise = loadStripe(publicKey, {
            stripeAccount: this.props.platform.stripe.stripeUserId,
        });
    }

    render() {
        const list = this.props.list;
        let listItems;

        if (list) {
            listItems = list.map((item) => {
                let price = '';

                if (item.price) {
                    price = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: item.price.currency,
                    }).format(item.price.unit_amount / 100);
                }

                return (
                    <li className="item" key={item.id}>
                        {item.name && (
                            <>
                                {<img src={item.images}/>}
                                <h4>{item.name}</h4>
                                <p>{price}</p>
                                <a
                                    href={"./products/" + item.id}
                                    target={"_self"}
                                    className="btn btn-primary"
                                >
                                    Buy now
                                </a>
                            </>
                        )}
                        <style jsx>{`
              .item {
                height: 400px;
                position: relative;

                border: 0;
                border-radius: 4px;
                text-align: center;
              }

              .item h4 {
                margin: 0;
                padding: 0;
                font-size: 14px;
                padding-bottom: 14px;
              }

              .item img {
                width: 100%;
                height: 240px;
                object-fit: cover;
                object-position: center center;
                margin-bottom: 20px;
              }
            `}</style>
                    </li>
                );
            });
        }

        return (
            <ul className="products-list">
                {listItems}

                <style jsx>{`
        .products-list {
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;

          display: grid;
          grid-template-columns: repeat(1, 1fr);
          grid-gap: 30px;
        }

        @media (min-width: 768px) {
          .products-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) { {
          .products-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }        
      `}</style>
            </ul>
        );
    }
}
