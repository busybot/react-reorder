import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// Override trigger method with one from TestUtils
$.fn.trigger = function (type, data) {
  TestUtils.Simulate[type](this[0], data);
};

function defineProperty (obj, prop, value) {
  Object.defineProperty(obj, prop, {value, enumerable: false});
}

function internalMount (component) {
  const element = document.createElement('div');

  let instance = ReactDOM.render(component, element);
  let wrapper = $(ReactDOM.findDOMNode(instance));

  defineProperty(wrapper, 'getInstance', function () {
    return instance;
  });

  defineProperty(wrapper, 'setProps', function (props) {
    const clone = React.cloneElement(component, props);

    instance = ReactDOM.render(clone, element);
    wrapper = $(ReactDOM.findDOMNode(instance));

    // instance.forceUpdate();
  });

  defineProperty(wrapper, 'setState', function (state) {
    instance.setState(state);
  });

  return wrapper;
}

export default function mount (component) {
  return internalMount(component);
}
