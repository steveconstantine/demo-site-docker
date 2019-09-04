import React, { Component } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import PropTypes from 'prop-types';

import {
  MdClose,
  MdShoppingCart,
  MdArrowBack,
  MdArrowForward
} from 'react-icons/md';

import { FiShoppingCart } from 'react-icons/fi';

import ShopContext from '../../context/ShopContext';
import CartList from './CartList';
import CartIndicator from './CartIndicator';
import EmptyCart from './EmptyCart';
import FreeBonus from './FreeBonus';
import ShippingInfo from './ShippingInfo';
import { Button, PrimaryButton } from '../shared/Buttons';

import {
  breakpoints,
  colors,
  fonts,
  spacing,
  dimensions
} from '../../utils/styles';

const themes = {
  light: {
    color: '#08080b',
    pseudo: 'transparent',
    symbol: {
      color: '#000',
      background: 'rgba(255,255,255,0.3)',
    },
  },
  dark: {
    color: '#fafafa',
    pseudo: 'transparent',
    symbol: {
      color: '#1D2128',
      background: '#dbdbdc',
    },
  },
}

const CartRoot = styled(`div`)`
  background: url(https://cdn.shopify.com/s/files/1/0708/4517/t/7/assets/photo-gallery-1492-Skye-Whales_1024x1024.jpg?7446335225893618956);
  background-size: cover;
  background-position: center center;
  bottom: 0;
  height: calc(100vh + 60px);
  position: fixed;
  overflow: hidden;
  right: 0;
  top: -1px;
  transform: translateX(100%);
  transition: transform 0.75s;
  width: 100%;
  will-change: transform;
  z-index: 1001s;

  &.open {
    transform: translateX(0%);
  }

  &.closed {
    transform: translateX(100%);
  }

  ::after {
    background-color: ${colors.lightest};
    background-position: center center;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 250ms;
  }

  &.loading {
    ::after {
      opacity: 0.9;
      pointer-events: all;
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: ${dimensions.cartWidthDesktop};

    &.covered {
      display: none;
    }
  }
`;

const Heading = styled(`header`)`
  align-items: center;
  display: flex;
  height: ${dimensions.headerHeight};
  justify-content: flex-start;
  color: ${colors.lightest};
  transform: ${p => (p.transform == true ? 'translateY(60px)' : 'translateY(0)')};
`;

const HeadingBottom = styled(`header`)`
  align-items: center;
  display: none;
  height: ${dimensions.headerHeight};
  justify-content: flex-end;
  align-self: bottom;
  color: ${colors.lightest};
  @media (min-height: 800px) {
    transform: translateY(calc(100vh - 60px));
    display: flex;
  }
`;

const Title = styled(`h2`)`
  flex-grow: 1;
  font-family: ${fonts.heading};
  font-size: 1.8rem;
  left: 0;
  margin: 0;
  margin-left: ${spacing.md}px;
  position: relative;
  color: ${colors.lightest};

  .open & {
    margin-left: calc(${dimensions.headerHeight} + ${spacing.md}px);

    @media (min-width: ${breakpoints.desktop}px) {
      margin-left: ${spacing.md}px;
    }
  }
`;

const Content = styled(`div`)`
  bottom: 0;
  overflow-y: auto;
  padding: ${spacing.lg}px;
  padding-bottom: 200px;
  position: absolute;
  top: ${dimensions.headerHeight};
  width: 100%;
  color: ${colors.lightest};

  @media (min-width: ${breakpoints.desktop}px) {
    ::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${colors.brandBright};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.lilac};
    }
    ::-webkit-scrollbar-track {
      background: ${colors.brandLight};
    }
  }
`;

const ItemsNumber = styled(`span`)`
  align-items: center;
  background: ${colors.error};
  border-radius: 50%;
  color: #000;
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  height: 36px;
  justify-content: center;
  width: 36px;
`;

const ItemsInCart = styled(`div`)`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  line-height: 1.2;
  text-align: right;

  ${ItemsNumber} {
    margin-left: ${spacing.xs}px;
    margin-right: ${spacing.md}px;
  }
`;

const Costs = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: ${spacing.sm}px;
`;

const Cost = styled(`div`)`
  display: flex;
  padding: 0 ${spacing.xs}px ${spacing['2xs']}px;

  :last-child {
    padding-bottom: 0;
  }

  span {
    color: ${colors.lightest};
    flex-basis: 60%;
    font-size: 0.9rem;
    text-align: right;
  }

  strong {
    color: ${colors.error};
    flex-basis: 40%;
    text-align: right;
  }
`;

const Total = styled(Cost)`
  border-top: 1px solid ${colors.brandBright};
  color: ${colors.lightest};
  margin-top: ${spacing.xs}px;
  padding-top: ${spacing.sm}px;

  span {
    font-weight: bold;
    text-transform: uppercase;
  }

  strong,
  span {
    color: inherit;
  }
`;

const iconEntry = keyframes`
  0%, 50% {
    transform: scale(0)
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const numberEntry = keyframes`
  0%{
    transform: scale(0)
  }
  90% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(0.6);
  }
`;

const CartToggleClose = styled(Button)`
  background: ${p => (p.theme !== 'dark' ? '#08080bcc' : '#fafafa')};
  color: ${p => (p.theme !== 'dark' ? '#fafafa' : '#08080b')};
  border: none;
  border-radius: 0;
  display: flex;
  height: ${dimensions.headerHeight};
  justify-content: center;
  left: 0;
  padding: 0;
  position: relative;
  top: 0;
  transform: translateX(0);
  transition: all 0.5s ease;
  width: ${dimensions.headerHeight};

  :focus {
    box-shadow: none !important;
  }

  .open & {
    background: ${p => (p.theme !== 'dark' ? '#fafafa' : '#08080b')};
    color: ${p => (p.theme !== 'dark' ? '#08080b' : '#fafafa')};
    transform: translateX(0);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    .open & {
      transform: translateX(0);
    }
  }

  svg {
    animation: ${iconEntry} 0.75s ease forwards;
    height: 28px;
    margin: 0;
    width: 28px;
  }

  ${ItemsNumber} {
    animation: ${numberEntry} 0.5s ease forwards;
    position: absolute;
    right:-10px;
    top: -10px;
    transform: scale(0.6);
  }
`;

const CartToggle = styled(Button)`
  background: ${p => (p.theme !== 'dark' ? 'transparent' : 'transparent')};
  color:  ${p => (p.theme !== 'dark' ? '#08080b' : '#fafafa')};
  border: none;
  border-radius: 0;
  display: flex;
  height: 40px;
  justify-content: center;
  left: 40px;
  padding: 0;
  position: relative;
  top: 0;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  width: 40px;

  :focus {
    box-shadow: none !important;
  }

  .open & {
    background: ${p => (p.theme !== 'dark' ? 'transparent' : 'transparent')};
    color: ${p => (p.theme !== 'dark' ? '#08080b' : '#fafafa')};
    transform: translateX(0);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    .open & {
      transform: translateX(-100%);
    }
  }

  @media (max-width: ${breakpoints.desktop}px) {
    left: -40px;
  }


  svg {
    animation: ${iconEntry} 0.75s ease forwards;
    height: 20px;
    margin: 0;
    width: 20px;
  }

  ${ItemsNumber} {
    animation: ${numberEntry} 0.5s ease forwards;
    position: absolute;
    right:-10px;
    top: -10px;
    transform: scale(0.6);
  }
`;

const CheckOut = styled(PrimaryButton)`
  font-size: 20px;
  margin: ${spacing.lg}px 0 ${spacing.md}px;
  width: 100%;
  background: black !important;
`;

const BackLink = styled(Button)`
  font-size: 20px;
  margin-bottom: ${spacing.sm}px;
  width: 100%;
  color: black !important;
  border: 1px solid black !important;
`;

class Cart extends Component {
  state = {
    className: 'closed',
    isLoading: false
  };

  componentDidUpdate(prevProps) {
    const componentStatusChanged = prevProps.status !== this.props.status;
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus;

    if (componentStatusChanged) {
      this.setState({
        className: this.props.status
      });
    }

    if (this.props.isDesktopViewport) {
      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === 'open') {
          setTimeout(() => {
            this.setState(state => ({
              className: state.className + ' covered'
            }));
          }, 500);
        } else {
          this.setState(state => ({
            className: state.className.replace('covered', '')
          }));
        }
      }
    }
  }

  render() {
    const { status, toggle, theme } = this.props;
    const { className, shortenCart } = this.state;
    const gatsbyStickerPackID =
      'Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtL2I1ZGY0NjRmMWQxYWQxM2MzMzJjYmQ0MjMyZDczZGE3P2NoZWNrb3V0PTY1NjU3NDMxMjk2MTRiMmRjZjc4MDIzYmRlYzA4MTM2';

    return (
      <ShopContext.Consumer>
        {({ client, checkout, removeLineItem, updateLineItem, adding }) => {
          const setCartLoading = bool => this.setState({ isLoading: bool });

          const handleRemove = itemID => async event => {
            event.preventDefault();
            await removeLineItem(client, checkout.id, itemID);
            setCartLoading(false);
          };

          const handleQuantityChange = lineItemID => async quantity => {
            if (!quantity) {
              return;
            }
            await updateLineItem(client, checkout.id, lineItemID, quantity);
            setCartLoading(false);
          };

          const itemsInCart = checkout.lineItems.reduce(
            (total, item) => total + item.quantity,
            0
          );

          const showFreeBonus = !checkout.lineItems.some(
            ({ id }) => id === gatsbyStickerPackID
          );

          return (
          <>
            <CartToggle
                  aria-label={`Shopping cart with ${itemsInCart} items`}
                  onClick={toggle}
                >
                  {status === 'open' ? (
                    <MdClose />
                  ) : (
                    <>
                      <FiShoppingCart color={ theme == 'dark' ? '#fafafa' : '#08080b' } />
                      {itemsInCart > 0 && (
                        <ItemsNumber>{itemsInCart}</ItemsNumber>
                      )}
                    </>
                  )}
            </CartToggle>
            <CartRoot
              className={`${className} ${
                this.state.isLoading ? 'loading' : ''
              }`}
            >
              <Heading cartTransform={shortenCart}>
                {status === 'open' ? (
                  <CartToggleClose
                    aria-label={`Shopping cart with ${itemsInCart} items`}
                    onClick={toggle}
                  >
                    <>
                      <MdClose />
                   </>
                  </CartToggleClose>
                ) : (
                <>
                </>
                )}
                <CartIndicator itemsInCart={itemsInCart} adding={adding} />
                <Title>Your Cart</Title>
                <ItemsInCart>
                  items
                  <br />
                  in cart
                  <ItemsNumber>{itemsInCart}</ItemsNumber>
                </ItemsInCart>
              </Heading>
              {checkout.lineItems.length > 0 ? (
              <>
                <Content>
                  <CartList
                    items={checkout.lineItems}
                    handleRemove={handleRemove}
                    updateQuantity={handleQuantityChange}
                    setCartLoading={setCartLoading}
                    isCartLoading={this.state.isLoading}
                  />

                  <Costs>
                    <Cost>
                      <span>Subtotal:</span>{' '}
                      <strong>USD ${checkout.subtotalPrice}</strong>
                    </Cost>
                    <Cost>
                      <span>Taxes:</span> <strong>{checkout.totalTax}</strong>
                    </Cost>
                    <Cost>
                      <span>Shipping (worldwide):</span> <strong>FREE</strong>
                    </Cost>
                    <Total>
                      <span>Total Price:</span>
                      <strong>USD ${checkout.totalPrice}</strong>
                    </Total>
                  </Costs>

                  <CheckOut href={checkout.webUrl}>
                    Check out <MdArrowForward />
                  </CheckOut>
                  <BackLink onClick={toggle}>
                    <MdArrowBack />
                    Back to shopping
                  </BackLink>

                  {showFreeBonus && <FreeBonus />}

                  <ShippingInfo />
                </Content>
                <HeadingBottom cartTransform={shortenCart}>
                {status === 'open' ? (
                  <CartToggleClose
                    aria-label={`Shopping cart with ${itemsInCart} items`}
                    onClick={toggle}
                  >
                    <>
                      <MdClose />
                   </>
                  </CartToggleClose>
                ) : (
                <>
                </>
                )}
                <CartIndicator itemsInCart={itemsInCart} adding={adding} />
                <Title>Your Cart</Title>
                <ItemsInCart>
                  items
                  <br />
                  in cart
                  <ItemsNumber>{itemsInCart}</ItemsNumber>
                </ItemsInCart>
              </HeadingBottom>
              </>
              ) : (
                <EmptyCart />
              )}
            </CartRoot>
          </>
          );
        }}
      </ShopContext.Consumer>
    );
  }
}

Cart.propTypes = {
  status: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  contributorAreaStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string
};

export default Cart;
