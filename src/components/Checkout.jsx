/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaCcVisa, FaBarcode, FaCcMastercard, FaCreditCard } from 'react-icons/fa';

export default class Checkout extends Component {
  state = {
    cartItems: [],
    fullName: '',
    cpf: '',
    email: '',
    adress: '',
    cep: '',
    phone: '',
    paymentType: '',
  }

  componentDidMount() {
    this.setState({
      cartItems: JSON.parse(localStorage.getItem('cart')) });
  }

  checkDuplicated = () => {
    const { cartItems } = this.state;

    const itemsToShow = [];

    cartItems.filter((each) => {
      const duplicated = itemsToShow.some((item) => item.id === each.id);

      if (!duplicated) {
        itemsToShow.push(each);
        return true;
      }
      return false;
    });

    return itemsToShow;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({
      [name]: value,
    });
  }

    validateFormOnClick = () => {
      const { fullName, cpf, email, cep, adress, phone, paymentType } = this.state;
      const validateFields = fullName.length === 0
        || cpf.length === 0
        || email.length === 0
        || cep.length === 0
        || adress.length === 0
        || phone.length === 0
        || paymentType.length === 0;
      this.setState({ validateFields }, () => {
        const { clearCart, history } = this.props;
        const { push } = history;
        if (!validateFields) {
          clearCart();
          push('/');
        }
      });
    }

    render() {
      const itemsToShow = this.checkDuplicated();
      const { validateFields } = this.state;
      const { getCartItemQuantity, totalPrice } = this.props;
      const MAX_SIZE_TITLE = 50;

      return (
        <div className="checkout-page">
          <div className="checkout-container">
            <form className="checkout-form">
              <span className="checkout-title">Suas informações:</span>
              <div className="buyer-data">
                <div className="full-name-container">
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    data-testid="checkout-fullname"
                    name="fullName"
                    onChange={ this.handleChange }
                    className="full-name-input"
                  />
                </div>
                <div className="grid">
                  <div className="cpf-container">
                    <input
                      type="text"
                      placeholder="CPF"
                      data-testid="checkout-cpf"
                      name="cpf"
                      onChange={ this.handleChange }
                      className="cpf-input"
                    />
                  </div>
                  <div className="email-container">
                    <input
                      type="email"
                      placeholder="E-mail"
                      data-testid="checkout-email"
                      name="email"
                      onChange={ this.handleChange }
                      className="email_input"
                    />
                  </div>
                  <div className="phone-container">
                    <input
                      type="text"
                      placeholder="Telefone"
                      data-testid="checkout-phone"
                      name="phone"
                      onChange={ this.handleChange }
                      className="phone-input"
                    />
                  </div>
                  <div className="cep-container">
                    <input
                      type="text"
                      placeholder="CEP"
                      data-testid="checkout-cep"
                      name="cep"
                      onChange={ this.handleChange }
                      className="cep-input"
                    />
                  </div>
                </div>
                <div className="adress-container">
                  <input
                    type="text"
                    placeholder="Endereço"
                    data-testid="checkout-address"
                    name="adress"
                    onChange={ this.handleChange }
                    className="adress-input"
                  />
                </div>
              </div>
              <span className="checkout-title">Método de Pagamento:</span>
              <div className="payments-container">
                <div className="payment-option">
                  <label htmlFor="boleto" className="payment-type-container">
                    <FaBarcode
                      className="icon-p"
                    />
                    <input
                      type="radio"
                      id="boleto"
                      name="paymentType"
                      data-testid="ticket-payment"
                      onChange={ this.handleChange }
                      className="boleto-radio"
                    />
                    Boleto
                  </label>
                </div>
                <div className="payment-option">
                  <label htmlFor="visa" className="payment-type-container">
                    <FaCcVisa
                      className="icon-p visa"
                    />
                    <input
                      type="radio"
                      name="paymentType"
                      data-testid="visa-payment"
                      id="visa"
                      onChange={ this.handleChange }
                      className="visa-radio"
                    />
                    Visa
                  </label>
                </div>
                <div className="payment-option">
                  <label htmlFor="master" className="payment-type-container">
                    <FaCcMastercard
                      className="icon-p master"
                    />
                    <input
                      type="radio"
                      name="paymentType"
                      data-testid="master-payment"
                      id="master"
                      onChange={ this.handleChange }
                      className="master-radio"
                    />
                    Master
                  </label>
                </div>
                <div className="payment-option">
                  <label htmlFor="elo" className="payment-type-container">
                    <FaCreditCard
                      className="icon-p"
                    />
                    <input
                      type="radio"
                      name="paymentType"
                      data-testid="elo-payment"
                      id="elo"
                      onChange={ this.handleChange }
                      className="elo-radio"
                    />
                    Elo
                  </label>
                </div>
              </div>
              <div>
                { validateFields && (
                  <span
                    data-testid="error-msg"
                  >
                    Campos inválidos
                  </span>
                )}
                <div className="btn-container">
                  <button
                    type="button"
                    data-testid="checkout-btn"
                    onClick={ this.validateFormOnClick }
                    className="chk-btn"
                  >
                    Finalizar compra
                  </button>

                </div>
              </div>
            </form>
            <div
              className="purchase-summary"
            >
              <span className="checkout-title">Resumo da Compra:</span>
              <div>
                { itemsToShow.map((item) => {
                  const { id, price, thumbnail, title } = item;
                  return (
                    <div key={ id } className="cart-product">
                      <img
                        src={ thumbnail }
                        alt={ title }
                        className="img-product"
                      />
                      <div className="qtd-title-product">
                        <span className="title-product">
                          { title.length > MAX_SIZE_TITLE
                            ? `${title.slice(0, MAX_SIZE_TITLE)}...`
                            : title }
                        </span>
                        <span className="qtd-product">
                          { `Quantidade: ${getCartItemQuantity(id)}` }
                        </span>
                      </div>
                      <span className="summary-price">
                        { (price * getCartItemQuantity(id)).toLocaleString('pt-BR',
                          { style: 'currency',
                            currency: 'brl',
                            minimumFractionDigits: 2 }) }
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="phantom-div" />
              <div className="cart-total-checkout">
                <span className="total-text-checkout">
                  Total:
                </span>
                <span className="total-price-checkout">
                  { totalPrice().toLocaleString('pt-BR',
                    { style: 'currency',
                      currency: 'brl',
                      minimumFractionDigits: 2 }) }
                </span>
              </div>
            </div>
            {/* <Link
            to="/carrinho"
          >
            <p>Voltar para o carrinho</p>
          </Link> */}
          </div>
        </div>
      );
    }
}

Checkout.propTypes = {
  getCartItemQuantity: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  totalPrice: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};
