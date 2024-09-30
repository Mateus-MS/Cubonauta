package models

type Case struct {
	Name     string    `bson:"Name"`
	Formulas []Formula `bson:"Formulas"`
}
