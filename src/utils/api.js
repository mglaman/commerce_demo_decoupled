import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import qs from 'qs';
// import normalize from 'json-api-normalizer';

import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

export const graphqlClient = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: new HttpLink({
        uri: `${process.env.REACT_APP_API_URL}/graphql`
    }),
});

/**
 * Error class for an API response outside the 200 range
 *
 * Taken from @drupal/admin-ui-utilities
 *
 * @param {number} status - the status code of the API response
 * @param {string} statusText - the status text of the API response
 * @param {object} response - the parsed JSON response of the API server if the
 *  'Content-Type' header signals a JSON response
 */
export class ApiError extends Error {
  constructor(status, statusText, response) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    this.message = `${status} - ${statusText}`;
  }

  static errorToHumanString(error) {
    if (error.name === 'ApiError') {
      return ApiError.toHumanString(error);
    }
    return error.toString();
  }

  static async toHumanString(error) {
    try {
      switch (error.status) {
        case 403:
          return `You don't have access: ${
            (await error.response.json()).message
          } Maybe you aren't logged in.`;
        case 404:
          return `Some page is missing: ${
            (await error.response.json()).message
          }`;
        case 400:
          return `You posted some invalid data, contact the administration team: ${
            (await error.response.json()).message
          }`;
        case 500:
          return `The server crashed, contact the administration team: ${
            (await error.response.json()).message
          }`;
        default:
          return error.toString();
      }
    } catch (e) {
      return error.toString();
    }
  }
}

/**
 * An async helper function for making requests to a Drupal backend.
 *
 * @param {string} REACT_APP_API_URL
 *  The base url of the backend (Drupal)
 * @param {string} endpoint
 *  The name of the end point you want to use.
 * @param {Object} [settings={}]
 *  Optional settings.
 * @param {Object} [settings.queryString=null]
 *  Key value parameters to be processed into a query string.
 * @param {Object} [settings.parameters={}]
 *  Route string construction parameters.
 * @param {Object} [settings.options={}]
 *  HTTP request options.
 * @return {Promise}
 *  Result of the fetch operation.
 */
export async function jsonapiClient(
  REACT_APP_API_URL,
  endpoint,
  { queryString = null, parameters = {}, options = {} } = {},
) {
  let url;
  // options.credentials = 'include';
  options.headers = options.headers || {};

  switch (endpoint) {
    case 'csrf_token':
      url = '/session/token';
      options.text = true;
      break;
    case 'content':
      url = '/jsonapi/node';
      options.headers.Accept = 'application/vnd.api+json';
      break;
    case 'content_single':
      url = `/jsonapi/node/${parameters.bundle}/${parameters.id}`;
      options.headers.Accept = 'application/vnd.api+json';
      break;
    case 'taxonomy_term': {
      url = `/jsonapi/taxonomy_term/${parameters.type}`;
      options.headers.Accept = 'application/vnd.api+json';
      break;
    }
    case 'featured_products': {
      url = '/jsonapi/commerce_product/simple';
      queryString = {
        'include': 'variations,variations.field_images',
        'fields[commerce_product--simple]': 'title,variations',
        'fields[commerce_product_variation--simple]': 'price,field_images',
        'fields[file--file]': 'uri',
        'filter[field_special_categories.entity.name]': 'Featured',
        'page[limit]': 6,
        'sort': '-changed',
      }
      break;
    }
    case 'product_single': {
      url = `/jsonapi/commerce_product/${parameters.bundle}/${parameters.id}`
      queryString = {
        'include': 'variations,variations.field_images,field_special_categories,field_product_categories,field_brand',
        'fields[commerce_product--simple]': 'title,body,variations,field_special_categories,field_product_categories,field_brand',
        'fields[commerce_product_variation--simple]': 'sku,price,resolved_price,field_images',
        'fields[file--file]': 'uri',
        'fields[taxonomy_term--product_categories]': 'name',
        'fields[taxonomy_term--special_categories]': 'name',
        'fields[taxonomy_term--brands]': 'name',
      };
      break;
    }
    default:
      url = endpoint;
      options.headers.Accept = 'application/vnd.api+json';
      break;
  }


  const data = await fetch(
    `${REACT_APP_API_URL}${url}${
      queryString
        ? `?${qs.stringify(queryString, { arrayFormat: 'brackets' })}`
        : ''
    }`,
    options,
  ).then(res => {
    if (![200, 201, 204].includes(res.status)) {
      throw new ApiError(res.status, res.statusText, res);
    }

    // CSRF tokens return text, not json.
    if (options.text) {
      return res.text();
    }
    return res.json();
  });
  return data;
}
