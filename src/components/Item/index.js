import React, { Component } from 'react';
import './styles.css';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as breadcrumbsActions from '../../actions/breadcrumbsActions';

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      loading: true
    }
  }

  componentDidMount() {
    let product = this._getProduct(this.props.match.params.id);
    
    product.then((data) => {
        this.setState({ product: data, loading: !this.state.loading });
        this.props.actions.updateBreadcrumbs(data.categories);
      }).catch((err) => {
        console.error(err);
      })
  }

  _getProduct(search) {
    return fetch(`http://localhost:3001/api/items/${search}`)
      .then((response) => {
        return response.json();
      });
  }

  render() {
    const product = this.state.product;

    console.log(product);

    if(this.state.loading) {
      return <div className="loading"></div>
    }

    return (
      <div className="details-container">
        <div className="row">
          <div className="col-md-6">
            <img src={ product.picture } alt="Imagen de producto" />
            <h3>Descripción del producto</h3>
            <p className='description'>{ ReactHtmlParser(product.categories) } { ReactHtmlParser(product.title) } { ReactHtmlParser(product.description) } </p> 
          </div>
          <div className="col-md-6">
            <p>{ product.condition === 'new' ? 'Nuevo' : 'Usado' } - { product.sold_quantity > 1 ? `${product.sold_quantity} vendidos` : `${product.sold_quantity} vendido` }</p>
            <h4 className='title'>{ product.title }</h4>
            <h2 className='price'>$ { product.price.amount }</h2>
            <button type="button" className="btn btn-primary btn-lg btn-block btn-blue">Comprar</button>
          </div>
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(breadcrumbsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Item);
