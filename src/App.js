import React from 'react';

import IssueFilter from './components/IssueFilter';
import IssueAdd from './components/IssueAdd';
import IssueTable from './components/IssueTable';

const data = [
  {
    id: 1,
    status: 'Open',
    owner: 'Ravan',
    created: new Date('2016-08-15'),
    effort: 5,
    completionDate: undefined,
    title: 'Error in console when clicking Add'
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2016-08-16'),
    effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel'
  }
];

export default () => (
  <div>
    <h1>Inventory Table</h1>
    <IssueFilter />
    <hr />
    <IssueTable issues={data} />
    <hr />
    <IssueAdd />
  </div>
);
