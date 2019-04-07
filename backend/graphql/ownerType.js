const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');
const IssueType = require('./issueType');

const OwnerType = new GraphQLObjectType({
  name: 'Owner',
  fields: () => ({
    id: { type: GraphQLID },
    owner: { type: GraphQLString },
    issues: {
      type: new GraphQLList(IssueType),
      resolve(parent, args) {
        //
      }
    }
  })
});

module.exports = OwnerType;
