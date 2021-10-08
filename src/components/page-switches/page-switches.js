import React from 'react';

import {connect} from 'react-redux';

import {onSwitch} from '../../actions/';

import PageSwitchesItem from '../page-switches-item/page-switches-item';

import './page-switches.scss';

const PageSwitches = ({page, onSwitch}) => {
    const itemsData = [
      {text: 'main page', keyValue: ''},
      {text: 'find a movie', keyValue: 'searching'}
    ];

    const items = itemsData.map(data => {
        const {text, keyValue} = data;

        return (
            <PageSwitchesItem
                key = {text}
                text = {text}
                active = {keyValue === page}
                keyValue = {keyValue}
                onSwitch = {onSwitch}
            />
        )
    });

    return <div className = 'pageSwitches'>{items}</div>;
}

const mapStateToProps = ({page}) => {
  return {
    page
  }
}

const mapDispatchToProps = {
  onSwitch
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSwitches);