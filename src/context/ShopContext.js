import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'geeduu.myshopify.com',
  storefrontAccessToken: 'a792ca225d9eba4b44a2b59643fbc803'
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
