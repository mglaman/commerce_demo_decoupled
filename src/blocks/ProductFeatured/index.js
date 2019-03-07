import React from 'react';
import { formatCurrency } from "../../utils/currency";
import { Link } from "react-router-dom";

export default (props) => {
  const defaultVariation = props.product.queryVariations.entities[0];
  const image = defaultVariation.fieldImages[0];
  return (
    <div className={`featured-seller col-md-4`}>
      <div className={`commerce-product--catalog`}>
        <div className={`commerce-product--catalog__image`}>
          <Link to={`/product/${props.product.entityUuid}`}>
            <img src={image.derivative.url} width={image.derivative.width} height={image.derivative.height} alt={image.alt} className={`img-fluid`} />
          </Link>
          <Link to={`/product/${props.product.entityUuid}`} className="commerce-product--catalog__hover-text"><i className="glyph glyph-look"></i>View product</Link>
        </div>
        <div className={`commerce-product--catalog__info`}>
          <div className={`field--name-title`}>
            <Link to={`/product/${props.product.entityUuid}`}>{props.product.entityLabel}</Link>
          </div>
          <div className={`field--name-price`}>{formatCurrency(defaultVariation.price.currencyCode, defaultVariation.price.number)}</div>
        </div>
      </div>
    </div>
  )
}
