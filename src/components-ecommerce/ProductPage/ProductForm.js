import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import {
  MdInfoOutline,
  MdErrorOutline,
  MdShoppingCart,
  MdSentimentDissatisfied
} from 'react-icons/md';

import { Fieldset, Input, Label, Select, Submit } from '../shared/FormElements';

import { breakpoints, colors, spacing, radius } from '../../utils/styles';

import ShopContext from '../../context/ShopContext';
import Link from '../shared/Link';

import message from 'antd/es/message'
import 'antd/es/message/style/css'

const key = 'updatableProduct';

const Form = styled(`form`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 16px 12px 16px;
  margin-top: -22px;


  @media (max-width: ${breakpoints.desktop}px) {
    margin-top: -32px;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    padding: 0 ${spacing.xl}px 32px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    justify-content: flex-start;
  }
`;

const Errors = styled(`div`)`
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: row;
  margin-bottom: ${spacing.xs}px;
  width: 100%;
`;

const ErrorSign = styled(`div`)`
  align-items: center;
  background: ${colors.error};
  border-radius: ${radius.default}px 0 0 ${radius.default}px;
  color: ${colors.lightest};
  display: flex;
  flex-basis: 40px;
  justify-content: center;

  svg {
    height: 20px;
    width: 20px;
  }
`;

const ErrorMsgs = styled(`ul`)`
  border: 1px dashed ${colors.error};
  border-left: none;
  border-radius: 0 ${radius.default}px ${radius.default}px 0;
  color: ${colors.error};
  flex-grow: 1;
  margin: 0;
  padding: ${spacing.xs}px;
  padding-left: ${spacing.xl}px;
`;

const QtyFieldset = styled(Fieldset)`
  flex-basis: 65px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: ${spacing.md}px;

  ${Label} {
    text-align: center;
    color: white !important;
  }

  ${Input} {
    padding: ${spacing.sm}px ${spacing.sm}px;
    text-align: center;
  }
`;

const SizeFieldset = styled(Fieldset)`
  flex-basis: calc(100% - ${spacing.md}px - 70px);

  ${Label} {
    justify-content: space-between;
    color: white !important;
  }
`;

const InfoLinks = styled(`div`)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: ${spacing.lg}px;
  width: 100%;
`;

const AddToCartButton = styled(Submit)`
  align-self: flex-end;
  flex-grow: 1;
  font-size: 20px !important;
  background: black !important;
  height: ${props => (props.fullWidth ? 'auto' : '')};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

class ProductForm extends Component {
  state = {
    variant:
      this.props.variants.length === 1 ? this.props.variants[0].shopifyId : '',
    quantity: 1,
    errors: []
  };

  handleChange = event => {
    event.preventDefault();

    if (event.target.value) {
      const errors = this.state.errors;

      const errorIdx = errors.findIndex(
        error => error.field === event.target.name
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors: errors });
      }
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = callback => event => {
    event.preventDefault();

    const errors = [];

    if (this.state.quantity < 1) {
      errors.push({
        field: 'quantity',
        msg: 'Choose a <b>quantity</b> of 1 or more.'
      });
    }

    if (this.state.variant === '' || this.state.variant === '.') {
      errors.push({
        field: 'variant',
        msg: 'Please select a <b>size</b>.'
      });
    }

    if (errors.length) {
      this.setState({ errors: errors });
      return;
    }

    this.success();
    callback(this.state.variant, this.state.quantity);
  };

  success = () => {
    message.loading({ content: ' Adding Product...', key });
    setTimeout(() => {
      message.success({ icon: (<AddedIcon />), content: ' Product Added!', key, duration: 2 });
    });
  };

  render() {
    const { variants } = this.props;
    const { errors } = this.state;

    const hasVariants = variants.length > 1;

    /*
     * For products without variants, we disable the whole Add to Cart button
     * and change the text. This flag prevents us from duplicating the logic in
     * multiple places.
     */
    const isOutOfStock = !hasVariants && !variants[0].availableForSale;

    return (
      <ShopContext.Consumer>
        {({ addVariantToCart }) => (
          <Form onSubmit={this.handleSubmit(addVariantToCart)} noValidate>
            <Errors show={errors.length}>
              <ErrorSign>
                <MdErrorOutline />
              </ErrorSign>
              <ErrorMsgs>
                {errors.map(error => (
                  <li
                    key={error.field}
                    dangerouslySetInnerHTML={{ __html: error.msg }}
                  />
                ))}
              </ErrorMsgs>
            </Errors>
            <QtyFieldset>
              <Label htmlFor="quantity">Qty.</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                step="1"
                onChange={this.handleChange}
                value={this.state.quantity}
              />
            </QtyFieldset>
            {hasVariants && (
              <SizeFieldset>
                <Label htmlFor="variant">
                  Size{' '}
                </Label>
                <Select
                  id="variant"
                  value={this.state.variant}
                  name="variant"
                  onChange={this.handleChange}
                >
                  <option disabled value="">
                    Choose Size
                  </option>
                  {variants.map(variant => (
                    <option
                      disabled={!variant.availableForSale}
                      value={variant.shopifyId}
                      key={variant.shopifyId}
                    >
                      {variant.title}
                    </option>
                  ))}
                </Select>
              </SizeFieldset>
            )}
            <AddToCartButton
              type="submit"
              disabled={isOutOfStock}
              fullWidth={hasVariants}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              {isOutOfStock ? <MdSentimentDissatisfied /> : <MdShoppingCart />}
            </AddToCartButton>
          </Form>
        )}
      </ShopContext.Consumer>
    );
  }
}

ProductForm.propTypes = {
  id: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired
};

export default ProductForm;

const AddedIcon = ({ fill = '#000' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9" fill='#000' />
  </svg>
)