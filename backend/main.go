package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/globalsign/mgo/bson"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// Item struct
type Item struct {
	ID      bson.ObjectId `bson:"_id,omitempty" json:"id"`
	Title   string        `bson:"title" json:"title"`
	Content string        `bson:"content" json:"content"`
}

func getAllItems(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Not yet implemented getAllItems")
}

func createItem(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Not yet implemented createItem")
}

func updateItem(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Not yet implemented updateItem")
}

func deleteItem(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Not yet implemented deleteItem")
}

func getItem(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Not yet implemented getItem")
}

func main() {
	db, err := sql.Open("Itemgres", "Itemgresql://leader@locahost:26257/inventory?sslmode=disable")
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	fmt.Println("[Connected] to CockroachDB")

	defer db.Close()

	originsOk := handlers.AllowedOrigins([]string{"*"})
	headersOk := handlers.AllowedHeaders([]string{"Origin", "X-Requested-With", "Content-Type", "Accept"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "Item", "PUT", "DELETE", "OPTIONS"})

	r := mux.NewRouter()
	r.HandleFunc("/api/item", getAllItems).Methods("GET")
	r.HandleFunc("/api/item", createItem).Methods("POST")
	r.HandleFunc("/api/item/{id}", updateItem).Methods("PUT")
	r.HandleFunc("/api/item/{id}", deleteItem).Methods("DELETE")
	r.HandleFunc("/api/item/{id}", getItem).Methods("GET")

	fmt.Println("Server running on localhost:3000")
	http.ListenAndServe(":3000", handlers.LoggingHandler(os.Stdout, handlers.CORS(originsOk, headersOk, methodsOk)(r)))
}
