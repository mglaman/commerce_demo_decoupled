import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from "../../utils/currency";
import { Link } from "react-router-dom";

const ProductFeatured = (props) => {
  const { product: {
    entityId,
    variations
  } } = props;
  const {entity: defaultVariation} = variations[0]
  const image = defaultVariation.fieldImages[0];
  const Url = `/product/${entityId}`;

  return (
      <div className={`commerce-product--catalog`}>
        <div className={`commerce-product--catalog__image`}>
          <Link to={Url}>
            <img src={image.derivative.url} width={image.derivative.width} height={image.derivative.height} alt={image.alt} className={`img-fluid`} />
          </Link>
          <Link to={Url} className="commerce-product--catalog__hover-text"><i className="glyph glyph-look"/>View product</Link>
        </div>
        <div className={`commerce-product--catalog__info`}>
          <div className={`field--name-title`}>
            <Link to={Url}>{props.product.entityLabel}</Link>
          </div>
          <div className={`field--name-price`}>{formatCurrency(defaultVariation.price.currencyCode, defaultVariation.price.number)}</div>
        </div>
      </div>
  )
}
ProductFeatured.propTypes = {
  product: PropTypes.object.isRequired,
}
export default ProductFeatured;
