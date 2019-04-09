import React from 'react';

const IssueRow = props => (
  <tr>
    <td>{props.issue.id}</td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner.name}</td>
    <td>
      {props.issue.created
        ? new Date(parseInt(props.issue.created)).toDateString()
        : ''}
    </td>
    <td>{props.issue.effort}</td>
    <td>
      {props.issue.completionDate
        ? new Date(parseInt(props.issue.completionDate)).toDateString()
        : ''}
    </td>
    <td>{props.issue.title}</td>
  </tr>
);

export default IssueRow;
