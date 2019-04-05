package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// Item struct
type Item struct {
	ID             int    `json:"id"`
	Status         string `json:"status"`
	Owner          string `json:"owner"`
	Created        string `json:"created"`
	Effort         string `json:"effort"`
	CompletionDate string `json:"completiondate"`
	Title          string `json:"title"`
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
	db, err := sql.Open("postgres", "postgresql://leader@locahost:26257/inventory?sslmode=disable")
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
