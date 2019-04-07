const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require('graphql');
const OwnerType = require('./ownerType');

const IssueType = new GraphQLObjectType({
  name: 'Issue',
  fields: () => ({
    id: { type: GraphQLID },
    status: { type: GraphQLString },
    owner: {
      type: OwnerType,
      resolve(parent, args) {
        // return_.find(authors, { id: parent.authorId})
      }
    },
    created: { type: GraphQLString },
    effort: { type: GraphQLInt },
    completionDate: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

module.exports = IssueType;
