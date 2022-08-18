/* eslint-disable max-lines */
/* eslint-disable react/no-unused-state */
// eslint-disable-next-line import/no-named-as-default
// Main Imports
import React from 'react';
// Logic Imports
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as api from './services/api';
// Component Imports
import Carrinho from './components/Carrinho';
import Content from './components/Content';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Product from './components/Product';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
// CSS Import
import './css/App.css';
import './css/Header.css';
import './css/Content.css';
import './css/Navbar.css';
import './css/Product.css';
import './css/Carrinho.css';
import './css/Checkout.css';
import './css/Footer.css';
// Icons Imports

class App extends React.Component {
  state = {
    searchInput: '',
    categoryId: '',
    sortId: '',
    clickSearch: false,
    searchResult: {
      results: [],
    },
    cartList: JSON.parse(localStorage.getItem('cart')) || [],
    redirect: false,
    statusStock: false,
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  updateStorage = () => {
    const { cartList } = this.state;
    localStorage.setItem('cart', JSON.stringify(cartList));
  }

  addToCart = (id) => {
    const { searchResult, cartList } = this.state;
    const { results } = searchResult;
    const productAddedToCart = results
      .filter((productItem) => productItem.id === id);
    this.setState({ cartList: [...cartList, ...productAddedToCart] }, () => {
      this.updateStorage();
    });
  }

  addToCartDetails = (product) => {
    const { cartList } = this.state;
    this.setState({ cartList: [...cartList, product] }, () => {
      this.updateStorage();
    });
  }

  updateCartQuantity = (id, numb, obj) => {
    const { cartList } = this.state;

    // Checa quantos itens tem no carrinho
    const thisProdList = cartList.filter((each) => each.id === id);

    // Pega um dos itens do carrinho
    const indexOfProd = cartList.lastIndexOf(obj);

    // IF para reduzir
    if (numb < 0 && thisProdList.length > 1) {
      const newArray = cartList.filter((_each, index) => index !== indexOfProd);
      this.setState({
        cartList: newArray,
      }, () => {
        this.updateStorage();
      });
      return;
    }

    // IF para aumentar
    if (numb > 0) {
      if (obj.available_quantity <= thisProdList.length) {
        console.log('oi');
        this.setState({
          statusStock: true,
        });
        return;
      }
      this.setState({ cartList: [...cartList, cartList[indexOfProd]] }, () => {
        this.updateStorage();
      });
    }
  }

  removeProduct = (id) => {
    const { cartList } = this.state;

    // Pegar todos os itens que não são o removido
    const newProdList = cartList.filter((each) => each.id !== id);

    this.setState({
      cartList: newProdList,
    }, () => {
      this.updateStorage();
    });
  }

  getCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const thisProdList = cartList.filter((each) => each.id === id);
    return thisProdList.length;
  }

  clearCart = () => {
    this.setState({ cartList: [] }, () => {
      this.updateStorage();
    });
  }

  searchRequest = async () => {
    const { searchInput } = this.state;
    const request = await api
      .getProductsFromCategoryAndQuery('', searchInput, '');

    this.setState({
      searchResult: request,
      clickSearch: true,
    });
  }

  searchRequestEnter = async (event) => {
    if (event.key === 'Enter') {
      this.setState({
        redirect: false,
      }, async () => {
        const { searchInput } = this.state;
        const request = await api.getProductsFromCategoryAndQuery('', searchInput);

        this.setState({
          searchResult: request,
          clickSearch: true,
          redirect: true,
        });
      });
    }
  }

  setFilterCategory = async (categoryId) => {
    const { searchInput, sortId } = this.state;
    const request = await api
      .getProductsFromCategoryAndQuery(categoryId, searchInput, sortId);

    this.setState({
      searchResult: request,
      clickSearch: true,
      categoryId,
    });
  }

  setFilterSort = async (sortId) => {
    const { searchInput, categoryId } = this.state;
    const request = await api
      .getProductsFromCategoryAndQuery(categoryId, searchInput, sortId);

    this.setState({
      searchResult: request,
      clickSearch: true,
      sortId,
    });
  }

  totalPrice = () => {
    const { cartList } = this.state;
    const pricesArray = cartList.map((cartItem) => {
      const { price } = cartItem;
      return price;
    });
    return pricesArray.reduce((acc, curr) => acc + curr, 0);
  }

  render() {
    const { searchInput, searchResult, clickSearch, cartList, redirect } = this.state;

    return (
      <BrowserRouter>
        <div className="page-body">
          <Header
            handleChange={ this.handleChange }
            searchRequest={ this.searchRequest }
            searchRequestEnter={ this.searchRequestEnter }
            cartList={ cartList }
          />

          { redirect && <Redirect to="/" /> }

          <Switch>
            <Route exact path="/front-end-online-store/">
              <Navbar
                setFilterCategory={ this.setFilterCategory }
              />
              <Content
                searchInput={ searchInput }
                searchResult={ searchResult }
                clickSearch={ clickSearch }
                addToCart={ this.addToCart }
                setFilterSort={ this.setFilterSort }
              />
            </Route>
            <Route
              exact
              path="/front-end-online-store/carrinho"
              render={ (props) => (<Carrinho
                { ...props }
                cartList={ cartList }
                updateCartQuantity={ this.updateCartQuantity }
                getCartItemQuantity={ this.getCartItemQuantity }
                removeProduct={ this.removeProduct }
                totalPrice={ this.totalPrice }
              />) }
            />
            <Route
              exact
              path="/front-end-online-store/product/:id"
              render={ (props) => (<Product
                { ...props }
                addToCartDetails={ this.addToCartDetails }
              />) }
            />
            <Route
              exact
              path="/front-end-online-store/checkout"
              render={ (props) => (
                <Checkout
                  { ...props }
                  getCartItemQuantity={ this.getCartItemQuantity }
                  clearCart={ this.clearCart }
                  totalPrice={ this.totalPrice }
                />
              ) }
            />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
