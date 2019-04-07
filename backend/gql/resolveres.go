package gql

import (
	"../cockroach"
	"github.com/graphql-go/graphql"
)

// Resolver struct
type Resolver struct {
	db *cockroach.Db
}

// UserResolver resolves our user query through a DB call to GetUserByName
func (r *Resolver) UserResolver(p graphql.ResolveParams) (interface{}, error) {
	// string the name from args and assert its type String
	name, ok := p.Args["name"].(string)
	if ok {
		users := r.db.GetUsersByName(name)
		return users, nil
	}
	return nil, nil
}
