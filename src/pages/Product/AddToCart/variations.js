import React, { PureComponent }  from 'react'
import PropTypes from 'prop-types';
import { cartAdd } from '../../../actions'
import { connect } from 'react-redux'
import _ from 'lodash'

class Variations extends PureComponent {
  static propTypes = {
    variations: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    const { variations } = props;
    const {entity: defaultVariation} = variations[0]

    // Build the known attributes.
    const selectedAttributes = {};
    const attributes = {}
    _.each(variations, ({ entity:variation}) => {
      _.each(variation, (value, key) => {
        if (_.includes(key, 'attribute')) {
          // If this is our first time encountering the attribute, prime its entry.
          if (!attributes.hasOwnProperty(key)) {
            attributes[key] = [];
            selectedAttributes[key] = defaultVariation[key].entity.entityId
          }
          const { entity:attributeEntity } = value;
          if (!_.some(attributes[key], attributeEntity)) {
            attributes[key].push(attributeEntity);
          }
        }
      })
    })
    _.each(attributes, (attribute) => _.sortBy(attribute, ['weight', 'name']))
    // End building attributes.

    this.state = {
      attributes,
      selectedAttributes,
      activeVariation: defaultVariation,
    }
  }
  getResolvedVariation () {
    const self = this
    return this.props.variations.filter(({ entity: variation }) => {
      return _.every(Object.keys(self.state.attributes), (fieldName) => {
        return variation.hasOwnProperty(fieldName) && (self.state.selectedAttributes[fieldName] === variation[fieldName].entity.entityId);
      })
    }).shift().entity
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
                {this.state.attributes.attributeColor.map((colorAttribute, key) => {
                  return (
                    <div key={key} className="form-check form-check-inline">
                      <input
                        className="form-check-input d-none form-radio"
                        type="radio"
                        name={`attributeColor`}
                        onChange={this.onChange}
                        value={colorAttribute.entityId}
                        checked={this.state.selectedAttributes.attributeColor === colorAttribute.entityId}
                        id={`attributeColor_${colorAttribute.entityId}`}
                      />
                        <label className="form-check-label option" htmlFor={`attributeColor_${colorAttribute.entityId}`}>
                          <div className="color_field__swatch color_field__swatch--square" style={{
                            backgroundColor: colorAttribute.fieldColor.color,
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
              <select name={`attributeSize`} className={`custom-select`} onChange={this.onChange} value={this.state.selectedAttributes.attributeSize}>
                {this.state.attributes.attributeSize.map((sizeAttribute, key) => {
                  return (
                    <option value={sizeAttribute.entityId} key={key}>
                      {sizeAttribute.entityLabel}
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