package gql

import (
	"../cockroach"
	"github.com/graphql-go/graphql"
)

// Root struct holds pointer to graphql object
type Root struct {
	Query *graphql.Object
}

// NewRoot returns base query type
func NewRoot(db *cockroach.Db) *Root {
	resolver := Resolver{db: db}
	root := Root{
		Query: graphql.NewObject(
			graphql.ObjectConfig{
				Name: "Query",
				Fields: graphql.Fields{
					"users": &graphql.Field{
						Type: graphql.NewList(User),
						Args: graphql.FieldConfigArgument{
							"name": &graphql.ArgumentConfig{
								Type: graphql.String,
							},
						},
						Resolve: resolver.UserResolver,
					},
				},
			},
		),
	}
	return &root
}
