import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import IssueFilter from './IssueFilter';
import IssueAdd from './IssueAdd';
import IssueTable from './IssueTable';

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

class IssueList extends Component {
  createIssue(newIssue) {
    const newIssues = this.state.issues.slice();
    newIssue.id = this.state.issues.length + 1;
    newIssues.push(newIssue);
    this.setState({ issues: newIssues });
  }

  loadData() {
    if (!this.props.data.loading) {
      return <IssueTable issues={this.props.data.issues} />;
    }
  }

  render() {
    return (
      <div>
        <h1>Inventory Table</h1>
        <IssueFilter />
        <hr />
        {this.loadData()}
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

export default graphql(getIssuesQuery)(IssueList);
