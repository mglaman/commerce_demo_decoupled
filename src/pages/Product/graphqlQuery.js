import gql from 'graphql-tag'

export default (productId) => gql`{
  commerceProductById(id: "${productId}") {
    entityId
    entityBundle
    title
    ... on CommerceProductSimple {
      body {
        processed
      }
      variations {
        entity {
          variationId
          entityBundle
          sku
          price {
            number
            currencyCode
          }
          ... on CommerceProductVariationSimple {
            fieldImages {
              derivative(style: PRODUCT) {
                url
                width
                height
              }
            }
          }
        }
      }
      fieldBrand {
        entity {
          name
        }
      }
      fieldProductCategories {
        entity {
          name
        }
      }
      fieldSpecialCategories {
        entity {
          name
        }
      }
    }
    ... on CommerceProductClothing {
      body {
        processed
      }
      variations {
        entity {
          variationId
          entityBundle
          sku
          price {
            number
            currencyCode
          }
          ... on CommerceProductVariationClothing {
            fieldImages {
              derivative(style: PRODUCT) {
                url
                width
                height
              }
            }
            attributeSize {
              entity {
                ... on CommerceProductAttributeValueSize {
                  entityId
                  entityLabel
                  weight
                }
              }
            }
            attributeColor {
              entity {
                ... on CommerceProductAttributeValueColor {
                  entityId
                  entityLabel
                  weight
                  fieldColor {
                    color
                  }
                }
              }
            }
          }
        }
      }
      fieldBrand {
        entity {
          name
        }
      }
      fieldProductCategories {
        entity {
          name
        }
      }
      fieldSpecialCategories {
        entity {
          name
        }
      }
    }
  }
}`