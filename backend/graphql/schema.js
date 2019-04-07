const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const issueGraphQLType = require('./issueType');
const Issue = require('../models/issue');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    issue: {
      type: issueGraphQLType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Issue.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
