import React from 'react';
import IssueList from './components/IssueList';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <IssueList />
  </ApolloProvider>
);

export default App;
