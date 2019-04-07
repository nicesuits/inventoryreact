package server

import (
	"encoding/json"
	"net/http"

	"../gql"
	"github.com/go-chi/render"
	"github.com/graphql-go/graphql"
)

// Server struct will hold connection to the DB and handlers
type Server struct {
	GqlSchema *graphql.Schema
}

type reqBody struct {
	Query string `json:"query"`
}

// GraphQL returns an http.HandlerFunc for /graphql endpoint
func (s *Server) GraphQL() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Body == nil {
			http.Error(w, "Must provide graphql query in request body", 400)
			return
		}
		var rBody reqBody
		err := json.NewDecoder(r.Body).Decode(&rBody)
		if err != nil {
			http.Error(w, "Error parsing JSON request body", 400)
		}
		result := gql.ExecuteQuery(rBody.Query, *s.GqlSchema)

		render.JSON(w, r, result)
	}
}
