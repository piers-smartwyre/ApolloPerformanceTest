import { gql } from '@apollo/client';


export const FULL_ORGANIZATION_FRAGMENT = gql`
  fragment FULL_ORGANIZATION_FRAGMENT on Organization {
    id
    name
  }
`;


export interface FULL_ORGANIZATION_FRAGMENT_TYPE {
  id: number;
  name: string;
  __typename: 'Organization';
}
