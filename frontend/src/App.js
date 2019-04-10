import React from 'react';
import { BrowserRouter, Route, hashHistory, Switch } from 'react-router-dom';
import IssueList from './components/IssueList';
import IssueEdit from './components/IssueEdit';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });
const NoMatch = () => <p>No Match Found</p>;

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter history={hashHistory}>
      <Switch>
        <Route exact path="/" component={IssueList} />
        <Route exact path="/issueEdit" component={IssueEdit} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
