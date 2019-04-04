import React from 'react';

import IssueFilter from './components/IssueFilter';
import IssueAdd from './components/IssueAdd';
import IssueTable from './components/IssueTable';

export default () => (
  <div>
    <h1>Inventory Table</h1>
    <IssueFilter />
    <hr />
    <IssueTable />
    <hr />
    <IssueAdd />
  </div>
);
