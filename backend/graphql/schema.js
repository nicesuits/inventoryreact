const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const issueType = require('./issueType');
const ownerType = require('./ownerType');
const Issue = require('../models/issue');
const Owner = require('../models/owner');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    issue: {
      type: issueType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Issue.findById(args.id);
      }
    },
    owner: {
      type: ownerType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Owner.findById(args.id);
      }
    },
    issues: {
      type: new GraphQLList(issueType),
      resolve(parent, args) {
        // return issues
      }
    },
    owners: {
      type: new GraphQLList(ownerType),
      resolve(parent, args) {
        // return owners
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
