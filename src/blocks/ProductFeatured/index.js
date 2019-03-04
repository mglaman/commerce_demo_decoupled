import React from 'react';
import ProductCatalog from '../ProductCatalog';

export default (props) => {
    return (
        <div className={`featured-seller col-md-4`}>
          <ProductCatalog product={props.product} />
        </div>
    )
}
