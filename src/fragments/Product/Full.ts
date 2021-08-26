import { gql } from '@apollo/client';


export const FULL_PRODUCT_FRAGMENT = gql`
  fragment FULL_PRODUCT_FRAGMENT on Product {
    product_identifier
    product_owner_identifier
    brand_name
    epa_number
    product_id
    product_name
    feature_label {
      name
      rank
      color_hex
    }
    organization_prices {
      uom
      price
      organization_ids
    }
    organization_latest_sales {
      price
      organization_id
      unit_of_measure
      transaction_date
    }
    product_owner_organization_id
  }
`;


export interface FULL_PRODUCT_FRAGMENT_TYPE {
  product_identifier: string;
  product_owner_identifier: string;
  brand_name: string;
  epa_number: string;
  product_id: number;
  product_name: string;
  feature_label: {
    name: string;
    rank: number;
    color_hex: string;
  },
  organization_prices: {
    uom: string;
    price: number;
    organization_ids: number[];
  }[];
  organization_latest_sales: {
    price: number;
    organization_id: number;
    unit_of_measure: string;
    transaction_date: string;
  }[];
  product_owner_organization_id: number;
  __typename: 'Product';
}
