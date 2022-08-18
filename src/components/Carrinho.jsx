/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Icons
import { CgMathPlus, CgMathMinus } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BsCartCheck } from 'react-icons/bs';

export default class Carrinho extends Component {
  checkDuplicated = () => {
    const { cartList } = this.props;

    const itemsToShow = [];

    cartList.filter((each) => {
      const duplicated = itemsToShow.some((item) => item.id === each.id);

      if (!duplicated) {
        itemsToShow.push(each);
        return true;
      }
      return false;
    });

    return itemsToShow;
  }

  render() {
    const { cartList,
      updateCartQuantity,
      getCartItemQuantity,
      removeProduct, totalPrice } = this.props;
    const DECREASE = -1;
    const INCREASE = 1;
    const itemsToShow = this.checkDuplicated();

    const MAX_SIZE_TITLE = 110;

    return (
      <div
        className="container"
      >
        { cartList.length > 0 ? (
          <div
            className="cart-container"
          >
            { itemsToShow.map((cartItem) => {
              const { thumbnail, price, title, id } = cartItem;
              const stock = cartItem.available_quantity;
              return (
                <div
                  className="item"
                  key={ cartItem.id }
                >
                  <div className="delete-product-container">
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => removeProduct(id) }
                      className="delete-product-btn"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                  <div
                    className="photo-and-title"
                  >
                    <div>
                      <img
                        src={ thumbnail }
                        alt={ title }
                        className="cart-img"
                      />
                    </div>
                    <div
                      data-testid="shopping-cart-product-name"
                      className="product-title"
                    >
                      { title.length > MAX_SIZE_TITLE
                        ? `${title.slice(0, MAX_SIZE_TITLE)}...`
                        : title }
                    </div>

                  </div>
                  <div
                    className="btns-container"
                  >
                    <div
                      className="decrease-btn-container"
                    >
                      <button
                        type="button"
                        onClick={ () => updateCartQuantity(id, DECREASE, cartItem) }
                        data-testid="product-decrease-quantity"
                        className="decrease-btn"
                      >
                        <CgMathMinus />
                      </button>

                    </div>
                    <div
                      className="quantity"
                      data-testid="shopping-cart-product-quantity"
                    >
                      { (getCartItemQuantity(id) > stock ? (
                        stock
                      ) : (
                        getCartItemQuantity(id)
                      ))}
                    </div>
                    <div
                      className="increase-btn-container"
                    >
                      <button
                        type="button"
                        onClick={ () => updateCartQuantity(id, INCREASE, cartItem) }
                        data-testid="product-increase-quantity"
                        className="increase-btn"
                      >
                        <CgMathPlus />
                      </button>
                    </div>
                  </div>
                  <div
                    className="product-price"
                  >
                    { (price * getCartItemQuantity(id)).toLocaleString('pt-BR',
                      { style: 'currency',
                        currency: cartItem.currency_id,
                        minimumFractionDigits: 2 }) }
                  </div>
                </div>
              );
            })}
            <div
              className="cart-footer"
            >
              <div className="checkout-btn-container">
                <Link
                  to="/checkout"
                >
                  <button
                    data-testid="checkout-products"
                    type="button"
                    className="checkout-btn"
                  >
                    Continuar a compra
                    { ' ' }
                    <BsCartCheck />
                  </button>
                </Link>
              </div>
              <div
                className="total-price"
              >
                { `Total: ${totalPrice().toLocaleString('pt-BR',
                  { style: 'currency',
                    currency: 'brl',
                    minimumFractionDigits: 2 })}` }
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              data-testid="shopping-cart-empty-message"
              className="empty-cart-message"
            >
              Seu carrinho está vazio
            </div>
          </div>
        )}
      </div>
    );
  }
}

Carrinho.propTypes = {
  cartList: PropTypes.instanceOf(Array).isRequired,
  updateCartQuantity: PropTypes.func.isRequired,
  getCartItemQuantity: PropTypes.func.isRequired,
  totalPrice: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
};
