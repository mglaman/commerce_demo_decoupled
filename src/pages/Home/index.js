import React, { Fragment } from 'react'
import FeaturedProducts from './jsonapi'

export default () => {
  return (
    <Fragment>
      <div className={`container-fluid`}>
        <div className={`container`}>
          <div className={`featured-products`}>
            <div className={`row`}>
              <div className="col-md-12">
                <h2 className="h1 text-center line">Featured products</h2>
              </div>
            </div>
            <div className={`row`}>
            <FeaturedProducts />
            </div>
          </div>
        </div>
      </div>
      <div className="testimonial container-fluid well well-lg well-primary">
        <div className="container">
          <div className="text-center row">
            <div className="col-xs-10 col-xs-push-1">
              <p className="testimonial__text h2">Slow-carb paleo bicycle rights bushwick. Tote bag mustache man bun swag, tbh chartreuse synth stumptown portland cray.</p>
              <div className="testimonial__rating">
                <i className="glyphicon glyphicon-star"></i>
                <i className="glyphicon glyphicon-star"></i>
                <i className="glyphicon glyphicon-star"></i>
                <i className="glyphicon glyphicon-star"></i>
                <i className="glyphicon glyphicon-star-empty"></i>
              </div>
              <p>Nikola White, customer</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
