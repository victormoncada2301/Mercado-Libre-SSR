import React from "react";
import { Link } from "react-router-dom";
import ic_shipping from "./ic_shipping.png";
import "./styles.css";

const ItemComponent = ({ product }) => (
  <div className="container-fluid">
    <Link to={`/items/${product.id}`}>
      <div className="product-container">
        <img
          className="img-product"
          src={product.picture}
          alt="Imagen del producto"
        />
        <div className="descrition">
          <h5> $ {product.price.amount}</h5>
          {product.free_shipping ? (
            <img
              className="free-shipping"
              src={ic_shipping}
              alt="ícono envío gratis"
            />
          ) : (
            ""
          )}
          <div className="container-text">
            <h4 className="title">{product.title}</h4>
            <span className="product-state">{product.address}</span>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default ItemComponent;
