package cockroach

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

// Db struct is our DB struct used for interactin with the DB
type Db struct {
	*sql.DB
}

// New makes a new database using the connection string and returns it, otherwise returns the error
func New(connString string) (*Db, error) {
	db, err := sql.Open("postgres", connString)
	if err != nil {
		return nil, err
	}
	// checking DB connection
	if err = db.Ping(); err != nil {
		return nil, err
	}

	return &Db{db}, nil
}

// ConnString returns a connection string for the DB
func ConnString(user string, host string, port int, dbName string) string {
	return fmt.Sprintf("postgres://%s@%s:%d/%s?sslmode=disable", user, host, port, dbName)
}

// User struct
type User struct {
	ID         int
	Name       string
	Age        int
	Profession string
	Friendly   bool
}

// GetUsersByName returns an array of Users
func (d *Db) GetUsersByName(name string) []User {
	// Prepare query, takes a name argument, protects from sql injection
	stmt, err := d.Prepare("SELECT * FROM users WHERE name = $1")
	if err != nil {
		fmt.Println("GetUserByName preparation Err: ", err)
	}

	// Make query with stmt, passing name argument
	rows, err := stmt.Query(name)
	if err != nil {
		fmt.Println("GetUserByName Query Err: ", err)
	}

	var u User
	users := []User{}

	for rows.Next() {
		err = rows.Scan(
			&u.ID,
			&u.Name,
			&u.Age,
			&u.Profession,
			&u.Friendly,
		)
		if err != nil {
			fmt.Println("Error scanning rows: ", err)
		}
		users = append(users, u)
	}
	return users
}
