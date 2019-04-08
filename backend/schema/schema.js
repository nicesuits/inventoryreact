const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require('graphql');
const issueType = require('./graphql/issueType');
const ownerType = require('./graphql/ownerType');
const Issue = require('./models/issue');
const Owner = require('./models/owner');

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

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addIssue: {
      type: issueType,
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
      type: ownerType,
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
