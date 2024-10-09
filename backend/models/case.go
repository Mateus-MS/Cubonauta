package models

type Case struct {
	Name     string    `bson:"Name"`
	Formulas []Formula `bson:"Formulas"`
}

type Formula struct {
	Name   string   `bson:"Name"`
	Solver string   `bson:"Solver"`
	Setter string   `bson:"Setter"`
	Tags   []string `bson:"Tags"`
}
