const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const issueGraphQLType = require('./issueType');
const ownerGraphQLType = require('./ownerType');
const Issue = require('../models/issue');
const Owner = require('../models/owner');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    issue: {
      type: issueGraphQLType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Issue.findById(args.id);
      }
    },
    owner: {
      type: ownerGraphQLType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Owner.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
