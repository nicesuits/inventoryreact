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
    name: { type: GraphQLString },
    issues: {
      type: new GraphQLList(IssueType),
      resolve(parent, args) {
        return 'hello world';
      }
    }
  })
});

module.exports = OwnerType;
