package models

type Formula struct {
	Name   string   `bson:"Name"`
	Solver string   `bson:"Solver"`
	Setter string   `bson:"Setter"`
	Tags   []string `bson:"Tags"`
}
