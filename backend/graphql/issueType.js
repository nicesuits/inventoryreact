const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const IssueType = new GraphQLObjectType({
  name: 'Issue',
  fields: () => ({
    id: { type: GraphQLString },
    status: { type: GraphQLString },
    owner: { type: GraphQLString },
    created: { type: GraphQLString },
    effort: { type: GraphQLInt },
    completionDate: { type: GraphQLString },
    title: { type: GraphQLString }
  })
});

module.exports = IssueType;
