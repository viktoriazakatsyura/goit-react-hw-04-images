import { Component } from 'react';
import PropTypes from 'prop-types'
import s from './Searchbar.module.css'
import { onErrorToast } from '../ErorrTost/ErorrTost';

class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
      }
  state = {
    queriesName: '',
  };
  handleNameChange =( e )=> {
    this.setState({ queriesName: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.queriesName.trim() === '') {
      onErrorToast();

      return;
    }

    this.props.onSubmit(this.state.queriesName);
    this.setState({ queriesName: '' });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.queriesName}
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;