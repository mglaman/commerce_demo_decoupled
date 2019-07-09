import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const ProductFeatured = (props) => {
  const { product: {
    id,
    attributes,
    relationships
  }, included } = props;

  const defaultVariationId = relationships.variations.data[0].id;
  const defaultVariation = included.filter(include => {
    return include.type === "commerce_product_variation--simple" && include.id === defaultVariationId
  }).pop();
  const variationImageData = defaultVariation.relationships.field_images.data[0];
  const variationImage = included.filter(include => {
    return include.type === "file--file" && include.id === variationImageData.id
  }).pop();
  console.log(variationImageData)
  console.log(variationImage)

  const Url = `/product/${id}`;

  return (
      <div className={`commerce-product--catalog`}>
        <div className={`commerce-product--catalog__image`}>
          <Link to={Url}>
            <img src={`${process.env.REACT_APP_API_URL}${variationImage.attributes.uri.url}`} width={variationImageData.meta.width} height={variationImageData.meta.height} alt={variationImageData.meta.alt} className={`img-fluid`} />
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
  included: PropTypes.array.isRequired,
}
export default ProductFeatured;
