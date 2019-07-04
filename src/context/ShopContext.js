import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'vancity87.myshopify.com',
  storefrontAccessToken: 'd9955d67f9b2fd457e4d028d4ee429f2'
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
