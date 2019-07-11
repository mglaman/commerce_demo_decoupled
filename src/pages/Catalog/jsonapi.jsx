import React, { PureComponent } from 'react';
import ProductFeatured from '../../blocks/ProductFeatured/jsonapi'
import { jsonapiClient, jsonapiNormalize } from '../../utils/api'

class JsonApiCatalog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      included: []
    };
  }
  async componentDidMount() {
    try {
      const result = await jsonapiClient(process.env.REACT_APP_API_URL, 'catalog_products', {
        parameters: {
          name: this.props.categoryName
        }
      });
      const resultNormalized = jsonapiNormalize(result);
      this.setState({
        isLoaded: true,
        data: resultNormalized.data,
        included: resultNormalized.included
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  }
  render() {
    return <div className={`container`}>
    <div className={`row`}>
      <aside className={`col-sm-3`}>
        <div className={`block-facets`}>
          <h3 className={`block-title`}>Brand</h3>
          <div className={`block-facet__content collapse show`}>
            <div className={`facets-widget-checkbox`}>
            </div>
          </div>
        </div>
        <div className={`block-facets`}>
          <h3 className={`block-title`}>Categories</h3>
          <div className={`block-facet__content collapse show`}>
            <div className={`facets-widget-checkbox`}>
            </div>
          </div>
        </div>
        <div className={`block-facets`}>
          <h3 className={`block-title`}>Special Categories</h3>
          <div className={`block-facet__content collapse show`}>
            <div className={`facets-widget-checkbox`}>
            </div>
          </div>
        </div>
      </aside>
      <section className={`col-sm-9`}>
        <div className={`container-fluid`}>
          <div className={`row`}>
            {this.state.data.map(entity => {
              return (
                <div className={`col-lg-4 col-md-6`} key={entity.id}>
                  <ProductFeatured product={entity} included={this.state.included} />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  </div>
  }
}
export default JsonApiCatalog;
