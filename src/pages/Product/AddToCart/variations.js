import React, { PureComponent }  from 'react'
import PropTypes from 'prop-types';
import { cartAdd } from '../../../actions'
import { connect } from 'react-redux'
import _ from 'lodash'

class Variations extends PureComponent {
  static propTypes = {
    variations: PropTypes.array.isRequired,
    included: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    const { variations, included } = props;
    const defaultVariation = variations[0];

    // Build the known attributes.
    const selectedAttributes = {};
    const attributes = {}
    _.each(variations, (variation) => {
      _.each(variation.relationships, (value, key) => {
        if (_.includes(key, 'attribute')) {
          // If this is our first time encountering the attribute, prime its entry.
          if (!attributes.hasOwnProperty(key)) {
            attributes[key] = [];
            selectedAttributes[key] = defaultVariation.relationships[key].data.id
          }
          const attributeEntity = included[value.data.type][value.data.id];
          if (!_.some(attributes[key], attributeEntity)) {
            attributes[key].push(attributeEntity);
          }
        }
      })
    })
    _.each(attributes, (attribute) => _.sortBy(attribute.attributes, ['weight', 'name']))
    // End building attributes.

    this.state = {
      attributes,
      selectedAttributes,
      activeVariation: defaultVariation,
    }
  }
  getResolvedVariation () {
    const self = this
    const filtered = this.props.variations.filter(variation => {
      const result = _.every(Object.keys(self.state.attributes), (fieldName) => {
        const selectedAttributeValue = self.state.selectedAttributes[fieldName];
        const variationAttributeValue = variation.relationships[fieldName].data;
        return selectedAttributeValue === variationAttributeValue.id;
      });
      return result;
    });
    return filtered.shift();
  }
  onChange({ target: { name, value } }) {
    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        [name]: value,
      },
    }, () => this.setState({
      activeVariation: this.getResolvedVariation(),
    }))
  }
  onAddToCart() {
    const { dispatch } = this.props;
    dispatch(cartAdd(this.state.activeVariation))
  }
  render() {
    return (
      <div className={`field--name-variations`}>
        <div className={`attribute-widgets form-group`}>
          <div className={`field--item`}>
            <div className={`product--rendered-attribute`}>
              <div className="panel-title form-required">Color</div>
              <div className={``}>
                {this.state.attributes.attribute_color.map((colorAttribute, key) => {
                  return (
                    <div key={key} className="form-check form-check-inline">
                      <input
                        className="form-check-input d-none form-radio"
                        type="radio"
                        name={`attribute_color`}
                        onChange={this.onChange}
                        value={colorAttribute.id}
                        checked={this.state.selectedAttributes.attribute_color === colorAttribute.id}
                        id={`attributeColor_${colorAttribute.id}`}
                      />
                        <label className="form-check-label option" htmlFor={`attributeColor_${colorAttribute.id}`}>
                          <div className="color_field__swatch color_field__swatch--square" style={{
                            backgroundColor: colorAttribute.attributes.field_color.color,
                            width: '30px',
                            height: '30px'
                          }}/>
                        </label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={`field--item form-type-select`}>
            <div className="panel-title form-required">Size</div>
            <div className="select-wrapper">
              <select name={`attribute_size`} className={`custom-select`} onChange={this.onChange} value={this.state.selectedAttributes.attribute_size}>
                {this.state.attributes.attribute_size.map((sizeAttribute, key) => {
                  return (
                    <option value={sizeAttribute.id} key={key}>
                      {sizeAttribute.attributes.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
        <div className={`field--item`}>
          <button className="button button--primary js-form-submit form-submit btn-success btn" type="button" onClick={this.onAddToCart.bind(this)}>
            Add to cart
          </button>
        </div>
      </div>
    )
  }
}
export default connect()(Variations);
