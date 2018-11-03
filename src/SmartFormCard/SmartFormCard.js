import React, { Component } from 'react';
import { assign } from 'lodash';
import './SmartInput.css';

import LoadingState from './LoadingState';
import EditState from './EditState';
import DisplayState from './DisplayState';

export default class SmartFormCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'display',
      machine: this.generateState('display', props.initialData),
    };
  }

  generateState(stateName, stateParams) {
    const previousState = this.state ? { ...this.state.machine } : {};

    switch (stateName) {
      case 'display':
        return {
          processing: false,
          error: null,
          value: { ...stateParams } || { ...previousState.value },
          editing: false,
          editValue: null,
        };
      case 'saving':
        return {
          processing: true,
          error: null,
          value: { ...previousState.value },
          editing: true,
          editValue: { ...previousState.editValue },
        };
      case 'edit':
        return {
          processing: false,
          error: null,
          value: { ...previousState.value },
          editing: true,
          editValue: { ...stateParams },
        };
      case 'save_error':
        return {
          processing: false,
          error: { ...stateParams },
          value: { ...previousState.value },
          editing: true,
          editValue: { ...previousState.editValue },
        };
      case 'loading': // Same as default
      default:
        return {
          processing: true,
          error: null,
          value: null,
          editing: false,
          editValue: null,
        };
    }
  }

  goToState = (stateName, stateParams) => {
    this.setState({
      name: stateName,
      machine: this.generateState(stateName, stateParams),
    });
  };

  handleSubmit = e => {
    const { name, value } = e.target;
    this.goToState('edit', assign(this.state.machine.value, { [name]: value }));
  };

  save = async valueToSave => {
    this.goToState('saving');
    this.props.handleUpdate(valueToSave, data => this.goToState('display', data));
  };

  render() {
    const { processing, error, value, editing, editValue } = this.state.machine;
    return processing ? (
      <LoadingState indicator={this.props.loadingIndicator || null} />
    ) : editing ? (
      <EditState
        values={value}
        editValues={editValue}
        error={error}
        handleSubmit={this.handleSubmit}
        handleSave={this.save}
      />
    ) : (
      <DisplayState values={value} handleEdit={this.goToState} />
    );
  }
}
