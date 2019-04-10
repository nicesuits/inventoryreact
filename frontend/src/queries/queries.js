import { gql } from 'apollo-boost';

const getIssuesQuery = gql`
  {
    issues {
      id
      status
      owner {
        name
      }
      created
      effort
      completionDate
      title
    }
  }
`;

export { getIssuesQuery };
