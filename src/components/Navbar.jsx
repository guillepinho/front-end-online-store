import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import * as api from '../services/api';

class Navbar extends Component {
  state = {
    categoriesList: [],
  }

  componentDidMount() {
    this.getCategoriesResponse();
  }

  getCategoriesResponse = async () => {
    const categories = await api.getCategories();
    this.setState({ categoriesList: categories });
  }

  slideLeft = () => {
    const MOVE = 800;
    const slider = document.getElementById('slider');
    const actualPos = slider.scrollLeft;
    slider.scroll(actualPos - MOVE, 0);
  }

  slideRight = () => {
    const MOVE = 800;
    const slider = document.getElementById('slider');
    const actualPos = slider.scrollLeft;
    slider.scroll(actualPos + MOVE, 0);
  }

  render() {
    const { categoriesList } = this.state;
    const { setFilterCategory } = this.props;
    const categories = categoriesList.map((category) => (
      <button
        key={ category.id }
        className="category"
        type="button"
        data-testid="category"
        onClick={ () => setFilterCategory(category.id) }
      >
        { category.name }
      </button>
    ));

    return (
      <div className="categories-container">
        <span className="arrow">
          <FaAngleLeft onClick={ this.slideLeft } />
        </span>
        <div className="category-list" id="slider">
          { categories }
        </div>
        <span className="arrow" id="right">
          <FaAngleRight onClick={ this.slideRight } />
        </span>
      </div>
    );
  }
}

Navbar.propTypes = {
  setFilterCategory: PropTypes.func.isRequired,
};

export default Navbar;
