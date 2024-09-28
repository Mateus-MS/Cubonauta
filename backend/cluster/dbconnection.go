package cluster

import (
	"database/sql"
	"sync"

	_ "github.com/lib/pq"
)

type DB_Conn struct {
	Db *sql.DB
}

var instance *DB_Conn
var once sync.Once

// Works as a private constructor in a Singleton
func startConnection() *DB_Conn {
	connStr := "user=adm password=adm dbname=postgres host=localhost port=5432 sslmode=disable"
	db, _ := sql.Open("postgres", connStr)

	return &DB_Conn{Db: db}
}

// Works as a public method of a Singleton
func GetInstance() *DB_Conn {
	once.Do(func() {
		instance = startConnection()
	})
	return instance
}
