import { gql } from '@apollo/client';

export const Schema = {
  getData: gql`
    query test_request {
      test_request
    }
  `,
};

export default Schema;
