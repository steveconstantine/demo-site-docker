import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'cleantheocean.myshopify.com',
  storefrontAccessToken: 'a9a42c18fa97c45dcdc66a50743c633f'
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
