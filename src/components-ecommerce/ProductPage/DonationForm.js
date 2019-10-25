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

import Popover from 'antd/es/popover'
import 'antd/es/popover/style/css'
import Button from 'antd/es/button'
import 'antd/es/button/style/css'
import InputNumber from 'antd/es/input-number'
import 'antd/es/input-number/style/css'
import message from 'antd/es/message'
import 'antd/es/message/style/css'

import ShopContext from '../../context/ShopContext';
import Link from '../shared/Link';

const Form = styled(`form`)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 4px;
  max-width: 600px;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: 0;
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
-  flex-grow: 1;
  margin: 0;
  padding: ${spacing.xs}px;
  padding-left: ${spacing.xl}px;
`;

const QtyFieldset = styled(Fieldset)`
  flex-basis: 135px;
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
  border: 3px solid white;
  height: ${props => (props.fullWidth ? 'auto' : '')};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

const AddDonationButton = styled(Button)`
  color: white;
  font-family: default;
  background: transparent;
  border: none;
  font-weight: 600;
  margin: 0 auto;
  width: 100%;
  padding: 20px 16px 2px 8px;
  text-align: right;

  &:hover {
    color: #FAFAFA;
    font-family: default;
    background: transparent;
    border: none;
  }

   &:focus {
    color: #FAFAFA;
    font-family: default;
    background: transparent;
    border: none;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding-right: 28px;
  }
`;

const key = 'updatable';

class DonationForm extends Component {
  state = {
    variant:
      this.props.variants.length === 1 ? this.props.variants[0].shopifyId : '',
    quantity: 1,
    errors: [],
    clicked: false,
    hovered: false,
  };

  handleValueChange = value => {
    if (value) {
      const errors = this.state.errors;

      const errorIdx = errors.findIndex(
        error => error.field === "quantity"
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors: errors });
      }
    }

    this.setState({ quantity: value });
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
    this.hide();

    callback(this.state.variant, this.state.quantity);
  };

  hide = () => {
    this.setState({
      clicked: false,
      hovered: false,
    });
  };

  handleHoverChange = visible => {
    this.setState({
      hovered: visible,
      clicked: false,
    });
  };

  handleClickChange = visible => {
    this.setState({
      clicked: visible,
      hovered: false,
    });
  };

  success = () => {
    message.loading({ content: 'Adding Donation...', key });
    setTimeout(() => {
      message.success({ content: 'Donation Added!', key, duration: 2 });
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

    const content = (
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
              <Label htmlFor="quantity">Donation Amount</Label>
              <InputNumber
                id="quantity"
                name="quantity"
                min="0"
                step="1"
                onChange={this.handleValueChange}
                value={this.state.quantity}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
              {isOutOfStock ? 'Out of Stock' : 'Add a Donation'}
            </AddToCartButton>
          </Form>
        )}
      </ShopContext.Consumer>)

    return (
      <Popover
        style={{width: 500, background: '#000000BB'}}
        content={ content }
        trigger="hover"
        visible={this.state.hovered}
        onVisibleChange={this.handleHoverChange}
        placement="topRight"
      >
        <Popover
          style={{width: 500, background: '#000000BB'}}
          content={
            content
          }
          trigger="click"
          visible={this.state.clicked}
          onVisibleChange={this.handleClickChange}
          placement="topRight"
        >
          <AddDonationButton>Add Donation<AddIcon /></AddDonationButton>
        </Popover> 
      </Popover>
    );
  }
}

DonationForm.propTypes = {
  id: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired
};

export default DonationForm;

const AddIcon = ({ fill = '#FFF' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 28 28"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#FFF" />
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
)