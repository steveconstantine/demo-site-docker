import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'contactgiftingwild.myshopify.com',
  storefrontAccessToken: '9f3b22d5cec1ebe0aff7ce914ea8b505'
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
