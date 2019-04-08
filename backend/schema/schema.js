const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} = require('graphql');

// const issueType = require('./issueType');
// const ownerType = require('./ownerType');
const Issue = require('../models/issue');
const Owner = require('../models/owner');

const IssueType = new GraphQLObjectType({
  name: 'Issue',
  fields: () => ({
    id: { type: GraphQLID },
    status: { type: GraphQLString },
    owner: {
      type: OwnerType,
      resolve(parent, args) {
        return Owner.findById(parent.ownerId);
      }
    },
    created: { type: GraphQLString },
    effort: { type: GraphQLInt },
    completionDate: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

const OwnerType = new GraphQLObjectType({
  name: 'Owner',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    issues: {
      type: new GraphQLList(IssueType),
      resolve(parent, args) {
        return Issue.find({ ownerId: parent.ownerId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    issue: {
      type: IssueType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Issue.findById(args.id);
      }
    },
    owner: {
      type: OwnerType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Owner.findById(args.id);
      }
    },
    issues: {
      type: new GraphQLList(IssueType),
      resolve(parent, args) {
        return Issue.find({});
      }
    },
    owners: {
      type: new GraphQLList(OwnerType),
      resolve(parent, args) {
        return Owner.find({});
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addIssue: {
      type: IssueType,
      args: {
        status: { type: GraphQLString },
        ownerId: { type: GraphQLID },
        created: { type: GraphQLString },
        effort: { type: GraphQLInt },
        completionDate: { type: GraphQLString },
        title: { type: GraphQLString }
      },
      resolve(parent, args) {
        const issue = new Owner({
          status: args.status,
          ownerId: args.ownerId,
          created: args.created,
          effort: args.effort,
          completionDate: args.completionDate,
          title: args.title
        });
        return issue.save();
      }
    },
    addOwner: {
      type: OwnerType,
      args: {
        owner: { type: GraphQLString }
      },
      resolve(parent, args) {
        const owner = new Owner({
          name: args.name
        });
        return owner.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
