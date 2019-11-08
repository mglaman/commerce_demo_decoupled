import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const ProductFeatured = (props) => {
  const { product: {
    id,
    type,
    attributes,
    relationships
  }, included } = props;

  const defaultVariationRelationship = relationships.variations.data[0];
  const defaultVariation = included[defaultVariationRelationship.type][defaultVariationRelationship.id];
  const variationImageRelationship = defaultVariation.relationships.field_images.data[0];
  const variationImage = included[variationImageRelationship.type][variationImageRelationship.id];
  const Url = `/product/${type.split('--').pop()}/${id}`;

  return (
      <div className={`commerce-product--catalog`}>
        <div className={`commerce-product--catalog__image`}>
          <Link to={Url}>
            <img src={`${process.env.REACT_APP_API_URL}${variationImage.attributes.uri.url}`} width={variationImageRelationship.meta.width} height={variationImageRelationship.meta.height} alt={variationImageRelationship.meta.alt} className={`img-fluid`} />
          </Link>
          <Link to={Url} className="commerce-product--catalog__hover-text"><i className="glyph glyph-look"/>View product</Link>
        </div>
        <div className={`commerce-product--catalog__info`}>
          <div className={`field--name-title`}>
            <Link to={Url}>{attributes.title}</Link>
          </div>
          <div className={`field--name-price`}>{defaultVariation.attributes.price.formatted}</div>
        </div>
      </div>
  )
}
ProductFeatured.propTypes = {
  product: PropTypes.object.isRequired,
  included: PropTypes.object.isRequired,
}
export default ProductFeatured;
