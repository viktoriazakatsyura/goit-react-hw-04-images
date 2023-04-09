import React, { Component } from "react";
import PropTypes from "prop-types";
import s from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
  }

  componentDidMount() {
    window.addEventListener("keydown", this.closeModalEsc)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModalEsc)
  }
  closeModalEsc = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = (e) => {
   if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  
  render() {
    const { children, onClose } = this.props;
    return (
      <div className={s.Overlay} onClick={onClose}>
        <div className={s.Modal}>{children}</div>
      </div>
    )
  }
}