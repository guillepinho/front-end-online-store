// Main Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// ICons Import
import { FaStopwatch, FaRegCreditCard, FaMoneyBillAlt } from 'react-icons/fa';

class Content extends Component {
  findThisProd = (id) => {
    const { searchResult: { results } } = this.props;
    const object = results.find((item) => item.id === id);
    return object;
  }

  createProductCard = (product) => {
    const { addToCart } = this.props;
    const { shipping } = product;
    const { free_shipping: freeShipping } = shipping;
    const MAX_SIZE_TITLE = 85;
    return (
      <div
        data-testid="product"
        key={ product.id }
      >
        <div className="product-card">
          <Link
            to={ {
              pathname: `/product/${product.id}`,
              state: {
                thisProd: this.findThisProd(product.id),
              },
            } }
            data-testid="product-detail-link"
          >
            <img
              src={ product.thumbnail }
              alt={ product.title }
              className="product-img"
            />
            <div className="product-info">
              <span className="price">
                { product.price
                  .toLocaleString('pt-BR',
                    { style: 'currency',
                      currency: 'brl',
                      minimumFractionDigits: 2 }) }
              </span>
              <span className="product-title">
                { product.title.length > MAX_SIZE_TITLE
                  ? `${product.title.slice(0, MAX_SIZE_TITLE)}...`
                  : product.title }
              </span>
              { freeShipping && (
                <span
                  data-testid="free-shipping"
                  className="free-shipping-content"
                >
                  FRETE
                  <br />
                  GRÁTIS
                </span>
              ) }
              <div className="button-container-fake" />
            </div>
          </Link>
          <div className="button-container">
            <button
              id={ product.id }
              type="button"
              className="add-cart-button"
              data-testid="product-add-to-cart"
              onClick={ () => addToCart(product.id) }
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // Props Import
    const { searchResult, clickSearch, setFilterSort } = this.props;
    const { results } = searchResult;

    const arrayOfItens = results
      .map((product) => this.createProductCard(product));

    // Input Checker
    const searchRule = clickSearch;

    return (
      <div className="content-page">
        { !searchRule ? '' : (
          <div className="filter-bar">
            Ordenar por:
            <select
              id="filters"
              name="sortId"
              className="filter-dropdown"
              onChange={ (event) => setFilterSort(event.target.value) }
            >
              <option value="">Mais Relevantes</option>
              <option value="price_asc">Menor preço</option>
              <option value="price_desc">Maior preço</option>
            </select>
          </div>
        )}
        <div className="search-results">
          {searchRule ? '' : (
            <div data-testid="home-initial-message" className="front-page">
              <div className="slideshow">
                <div className="slideshow-wrapper">
                  <div className="slide">
                    <img
                      className="slide-img"
                      src="https://http2.mlstatic.com/D_NQ_763385-MLA51152952744_082022-OO.webp"
                      alt="promoção produtos fitness"
                    />
                  </div>
                  <div className="slide">
                    <img
                      className="slide-img"
                      src="https://http2.mlstatic.com/D_NQ_822357-MLA51147186239_082022-OO.webp"
                      alt="liquidação produtos tecnológicos"
                    />
                  </div>
                  <div className="slide">
                    <img
                      className="slide-img"
                      src="https://http2.mlstatic.com/D_NQ_830913-MLA51147387143_082022-OO.webp"
                      alt="promoção cupom produtos infantis e bebês"
                    />
                  </div>
                </div>
              </div>
              <div className="pros">
                <div className="pros-card">
                  <span className="pros-icon">
                    <FaMoneyBillAlt />
                  </span>
                  <span className="pros-title">Pagamento rápido e seguro</span>
                  <span className="pros-subtitle">com ONL Pago</span>
                </div>
                <div className="pros-card">
                  <span className="pros-icon">
                    <FaRegCreditCard />
                  </span>
                  <span className="pros-title">Até 10 parcelas sem juros</span>
                  <span className="pros-subtitle">você podendo mais!</span>
                </div>
                <div className="pros-card">
                  <span className="pros-icon">
                    <FaStopwatch />
                  </span>
                  <span className="pros-title">Pagamento por Pix</span>
                  <span className="pros-subtitle">mais praticidade!</span>
                </div>
              </div>
            </div>
          )}
          { clickSearch && (arrayOfItens.length > 0
            ? arrayOfItens
            : <div>Nenhum produto foi encontrado</div>) }
        </div>
      </div>

    );
  }
}

Content.propTypes = {
  searchResult: PropTypes.instanceOf(Object).isRequired,
  clickSearch: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
  setFilterSort: PropTypes.func.isRequired,
};

export default Content;
