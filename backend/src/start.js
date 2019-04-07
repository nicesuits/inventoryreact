const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { prepare } = require('../utils');

const app = express();

app.use(cors());

const start = async () => {
  const homePath = '/graphiql';
  const url = 'http://localhost';
  const port = 4000;
  const mongo_url = 'mongodb://localhost:27017/blog';
  const client = new MongoClient(mongo_url);

  try {
    await client.connect();

    const Posts = client.db('posts');
    const Comments = client.db('comments');

    const typeDefs = [
      `
            type Query {
                post(_id: String): Post
                posts: [Post]
                comment(_id: String): Comment
            }

            type Post {
                _id: String
                title: String
                content: String
                comments: [Comment]
            }
            
            type Comment {
                _id: String
                postId: String
                content: String
                post: Post
            }

            type Mutation {
                createPost(title: String!, content: String!): Post!
                createComment(postId: String!, content: String!): Comment!
            }

            schema {
                query: Query
                mutation: Mutation
            }
        `
    ];

    const resolvers = {
      Query: {
        post: async (root, { _id }) => {
          return prepare(
            await Posts.collection('posts').findOne(ObjectId(_id))
          );
        },
        posts: async () => {
          return (await Posts.collection('posts')
            .find({})
            .toArray()).map(prepare);
        },
        comment: async (root, { _id }) => {
          return prepare(
            await Comments.collection('comments').findOne(ObjectId(_id))
          );
        }
      },
      Post: {
        comments: async ({ _id }) => {
          return (await Comments.collection('comments')
            .find({ postId: _id })
            .toArray()).map(prepare);
        }
      },
      Comment: {
        post: async ({ postId }) => {
          return prepare(
            await Posts.collection('posts').findOne(ObjectId(postId))
          );
        }
      },
      Mutation: {
        createPost: async (root, args, context, info) => {
          const res = await Posts.collection('posts').insertOne(args);
          return prepare(res.ops[0]);
        },
        createComment: async (root, args) => {
          const res = await Comments.collection('comments').insertOne(args);
          return prepare(
            await Comments.collection('comments').findOne({
              _id: res.insertedIds[1]
            })
          );
        }
      }
    };
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
    app.use(homePath, graphiqlExpress({ endpointURL: '/graphql' }));
    app.listen(port, () => {
      console.log(`Server running on ${url}:${port}${homePath}`);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

module.exports = start;
