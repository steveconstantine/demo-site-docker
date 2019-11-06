import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'helptheoceansolution.myshopify.com',
  storefrontAccessToken: '22a9269548da76af4fa18cc6e390a1f2'
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
