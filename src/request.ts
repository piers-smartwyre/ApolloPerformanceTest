import {
  gql,
  LazyQueryHookOptions,
  ApolloClient,
  useLazyQuery,
} from '@apollo/client';
import { useState } from 'react';
import {
  FULL_ORGANIZATION_FRAGMENT,
  FULL_ORGANIZATION_FRAGMENT_TYPE,
} from './fragments/Organization/Full';
import {
  FULL_PRODUCT_FRAGMENT,
  FULL_PRODUCT_FRAGMENT_TYPE,
} from './fragments/Product/Full';

export interface ProductsCatalog {
  productsCatalog: {
    organizations: FULL_ORGANIZATION_FRAGMENT_TYPE[];
    products: FULL_PRODUCT_FRAGMENT_TYPE[];
    __typename: 'ProductsCatalog';
  };
}

export interface ProductsCatalogVariables { }

export const PRODUCTS_CATALOG_QUERY = gql`
  query ProductsCatalog($orgNodeCode: String, $lastUpdated: String) {
    productsCatalog(orgNodeCode: $orgNodeCode, lastUpdated: $lastUpdated)
      @rest(type: "ProductsCatalog", path: "/") {
      organizations @type(name: "Organization") {
        ...FULL_ORGANIZATION_FRAGMENT
      }
      products @type(name: "Product") {
        ...FULL_PRODUCT_FRAGMENT
      }
    }
  }
  ${FULL_ORGANIZATION_FRAGMENT}
  ${FULL_PRODUCT_FRAGMENT}
`;

export const useProductsCatalogLazyQuery = (
  options?: LazyQueryHookOptions<ProductsCatalog, ProductsCatalogVariables>,
) => useLazyQuery(PRODUCTS_CATALOG_QUERY, options);

export const useProductsCatalogLazyQueryRaw = (client: ApolloClient<any>) => {
  const [state, setState] = useState<{
    loading: boolean;
    data: ProductsCatalog['productsCatalog'] | null;
  }>({
    loading: false,
    data: null,
  });

  const query = async () => {
    try {
      setState({
        ...state,
        loading: true,
        data: null,
      });

      const res = await fetch('http://localhost:3000', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data: ProductsCatalog['productsCatalog'] = await res.json();

      for (const org of data.organizations) {
        org.__typename = 'Organization';
      }

      for (const org of data.products) {
        org.__typename = 'Product';
      }

      client.writeQuery<ProductsCatalog, ProductsCatalogVariables>({
        query: PRODUCTS_CATALOG_QUERY,
        data: {
          productsCatalog: data,
        },
      });

      setState({
        ...state,
        loading: false,
        data,
      });

      return {
        productsCatalog: data,
      };
    } catch (e) {
      return null;
    }
  };

  return [query, state];
};
