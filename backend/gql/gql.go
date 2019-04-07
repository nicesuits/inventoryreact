package gql

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

// ExecuteQuery runs graphql queries
func ExecuteQuery(query string, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})
	if len(result.Errors) > 0 {
		fmt.Println("Unexpected errors inside ExecuteQuery: %v", result.Errors)
	}
	return result
}
