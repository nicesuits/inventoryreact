import React from 'react';

import IssueFilter from './IssueFilter';
import IssueAdd from './IssueAdd';
import IssueTable from './IssueTable';

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

const IssueList = () => (
  <div>
    <h1>Inventory Table</h1>
    <IssueFilter />
    <hr />
    <IssueTable issues={data} />
    <hr />
    <IssueAdd />
  </div>
);

export default IssueList;
