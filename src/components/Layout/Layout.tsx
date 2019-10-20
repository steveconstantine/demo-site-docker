import React, { Component, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { StoreContext } from 'redux-react-hook'
import { ContactProvider } from '@components/Contact/Contact.Context'

import ContactSlideIn from '@components/Contact/Contact.SlideIn'
import Container from '@components/Layout/Layout.Container'
import CommandLine from '@components/CommandLine'
import Cart from '../../components-ecommerce/Cart'
import ProductImagesBrowser from '../../components-ecommerce/ProductPage/ProductImagesBrowser';


import { GlobalStyles, theme } from '@styles'
import store from '@store'
import shortcuts from '@shortcuts'

import ShopContext, { defaultShopContext } from '../../context/ShopContext';
import UserContext, { defaultUserContext } from '../../context/UserContext';
import InterfaceContext, {
  defaultInterfaceContext
} from '../../context/InterfaceContext';

interface LayoutProps {
  background?: string
  nav: {
    fixed?: boolean
    offset?: boolean
    theme?: string
  }
  footer: {
    visible?: boolean
    theme?: string
  }
}


/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */

 class Layout extends Component<LayoutProps> {

  constructor(props: any) {
        super(props);
  };

  state = {
    interface: {
      ...defaultInterfaceContext,
      toggleCart: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            contributorAreaStatus:
              state.interface.isDesktopViewport === false &&
              state.interface.contributorAreaStatus === 'open'
                ? 'closed'
                : state.interface.contributorAreaStatus,
            cartStatus:
              this.state.interface.cartStatus === 'open' ? 'closed' : 'open'
          }
        }));
      },
      toggleProductImagesBrowser: img => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            productImagesBrowserStatus: img ? 'open' : 'closed',
            productImageFeatured: img
              ? img
              : state.interface.productImageFeatured
          }
        }));
      },
      featureProductImage: img => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            productImageFeatured: img
          }
        }));
      },
      setCurrentProductImages: images => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            currentProductImages: images,
            productImageFeatured: null
          }
        }));
      },
      toggleContributorArea: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            contributorAreaStatus: this.toggleContributorAreaStatus()
          }
        }));
      }
    },
    user: {
      ...defaultUserContext,
      handleLogout: () => {
        this.setState({
          user: {
            ...defaultUserContext,
            loading: false
          }
        });
        logout(() => navigate('/'));
      },
      updateContributor: data => {
        this.setState(state => ({
          user: {
            ...state.user,
            contributor: data,
            loading: false
          }
        }));
      }
    },
    store: {
      ...defaultShopContext,
      addVariantToCart: (variantId, quantity) => {
        if (variantId === '' || !quantity) {
          console.error('Both a size and quantity are required.');
          return;
        }

        this.setState(state => ({
          store: {
            ...state.store,
            adding: true
          }
        }));

        const { checkout, client } = this.state.store;

        const checkoutId = checkout.id;
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) }
        ];

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then(checkout => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout,
                adding: false
              }
            }));
          });
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        return client.checkout
          .removeLineItems(checkoutID, [lineItemID])
          .then(res => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout: res
              }
            }));
          });
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        const lineItemsToUpdate = [
          { id: lineItemID, quantity: parseInt(quantity, 10) }
        ];

        return client.checkout
          .updateLineItems(checkoutID, lineItemsToUpdate)
          .then(res => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout: res
              }
            }));
          });
      }
    }
  };

        async initializeCheckout() {
          // Check for an existing cart.
          const isBrowser = typeof window !== 'undefined';
          const existingCheckoutID = isBrowser
            ? localStorage.getItem('shopify_checkout_id')
            : null;

          const setCheckoutInState = checkout => {
            if (isBrowser) {
              localStorage.setItem('shopify_checkout_id', checkout.id);
            }

            console.log(checkout.id);

            this.setState(state => ({
              store: {
                ...state.store,
                checkout
              }
            }));
          };

          const createNewCheckout = () => this.state.store.client.checkout.create();
          const fetchCheckout = id => this.state.store.client.checkout.fetch(id);

          if (existingCheckoutID) {
            try {
              const checkout = await fetchCheckout(existingCheckoutID);

              // Make sure this cart hasn’t already been purchased.
              if (!checkout.completedAt) {
                setCheckoutInState(checkout);
                return;
              }
            } catch (e) {
              localStorage.setItem('shopify_checkout_id', null);
            }
          }

          const newCheckout = await createNewCheckout();
          setCheckoutInState(newCheckout);
      };

 componentDidMount() {
    console.log(this.state.store);
    this.initializeCheckout();
  }

  render() {
  const { location } = this.props;

  console.log(this.state.interface.toggleProductImagesBrowser);

    return (
      <StoreContext.Provider value={store}>
        <ThemeProvider theme={theme}>
          <ContactProvider>
            <ShopContext.Provider value={this.state.store}>
             <InterfaceContext.Provider value={this.state.interface}>
                        <InterfaceContext.Consumer>
                          {({
                            isDesktopViewport,
                            cartStatus,
                            toggleCart,
                            contributorAreaStatus,
                            toggleContributorArea,
                            productImagesBrowserStatus,
                            currentProductImages,
                            featureProductImage,
                            productImageFeatured,
                            toggleProductImagesBrowser
                          }) => (
                    <>
                      <GlobalStyles />
                      <Container paddingBottom={this.props.paddingBottom} nav={this.props.nav} background={this.props.background}>
                        {this.props.children}
                      </Container>
                      <ContactSlideIn />
                      {currentProductImages.length > 0 && (
                        <ProductImagesBrowser
                          featureProductImage={featureProductImage}
                          images={currentProductImages}
                          position={productImagesBrowserStatus}
                          imageFeatured={productImageFeatured}
                          toggle={toggleProductImagesBrowser}
                          isDesktopViewport={isDesktopViewport}
                        />
                      )}
                    </>
                  )}
                </InterfaceContext.Consumer>
              </InterfaceContext.Provider>
            </ShopContext.Provider>
          </ContactProvider>
        </ThemeProvider>
      </StoreContext.Provider>
    )
  }
}

export default Layout
