import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'gatsby-swag.myshopify.com',
  storefrontAccessToken: '9aa73c089d34741f36edbe4d7314373a'
});

export const defaultShopContext = {
  client,
  isCartOpen: false,
  adding: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {}
};

const ShopContext = React.createContext(defaultShopContext);

export const withShopContext = Component => {
  return props => (
    <ShopContext.Consumer>
      {context => <Component {...props} storeContext={context} />}
    </ShopContext.Consumer>
  );
};

export default ShopContext;
