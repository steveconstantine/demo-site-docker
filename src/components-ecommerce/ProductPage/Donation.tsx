import React, { Component, useState } from 'react';

import InputNumber from 'antd/es/input-number'; 
import 'antd/es/input-number/style/css';

export default (props) => {

	function onChange(value) {
	  props.sendToForm(value);
	  console.log('changed', value);
	}

    return (
	 <div>
	    <InputNumber
	      defaultValue={0}
	      min={0}
	      size={'56px'}
	      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
	      parser={value => value.replace(/\$\s?|(,*)/g, '')}
	      onChange={onChange}
	    />
	  </div>
    );
}