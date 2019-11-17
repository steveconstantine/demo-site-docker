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
  font-size: 20px;
  background: black !important;
  border: 3px solid white;
  height: ${props => (props.fullWidth ? 'auto' : '')};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
`;

const AddDonationButton = styled(Button)`
  color: ${props => (props.mode =='dark' ? '#FFF' : '#000')};
  font-family: default;
  background: transparent;
  border: 1px solid transparent !important;
  border-radius: 3px;
  font-weight: 600;
  margin: 0 auto;
  width: 150px;  
  padding: 10px 28px 10px 28px;
  height: 40px;
  text-align: right;
  margin-left: 30px;
  margin-right: 30px;
  font-size: 2.15rem;
  text-shadow: ${props => (props.mode =='dark' ? '1px 1px 1px black, 0 0 5px black, 0 0 2px darkblue' : '1px 1px 1px white, 0 0 5px white, 0 0 2px lightblue')};
  align-self: center;

  @media all and (max-width: 1000px) {
    margin-right: 14px;
    margin-left: 0;
  }

  &:hover {
    color: ${props => (props.mode =='dark' ? '#FFF' : '#000')};
    border: 1px solid transparent !important;
    font-family: default;
    background: transparent;
    border: none;
  }

   &:focus {
    color: ${props => (props.mode =='dark' ? '#FFF' : '#000')};
    border: 1px solid transparent !important;
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
        msg: 'Choose a <b>dollar value</b> of 1 or more.'
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
    message.loading({ content: ' Adding Donation...', key });
    setTimeout(() => {
      message.success({ icon: (<AddedIcon />), content: ' Donation Added!', key, duration: 2 });
    });
  };

  render() {
    const { variants, text, mode } = this.props;
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
        overlayStyle={{'transformOrigin': '500px 250px'}}
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
          overlayStyle={{'transformOrigin': '500px 250px'}}
        >
          <AddDonationButton mode={mode}>{text}<AddIcon fill={mode == 'dark' ? '#FFF' : '#000'}/></AddDonationButton>
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

const AddIcon = ({ fill }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 28 28"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
)

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