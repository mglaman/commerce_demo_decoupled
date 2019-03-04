import React from 'react';

export default (props) => {
    // console.log(props);
    const defaultVariation = props.product.queryVariations.entities[0];
    return (
        <div className={`featured-seller col-md-4`}>
            <strong>{props.product.entityLabel}</strong>
            <p>{defaultVariation.price.currencyCode}{defaultVariation.price.number.toLocaleString('en-US')}</p>
        </div>
    )
}
