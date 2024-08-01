package models

type DB_Case struct {
	ID       int32        `bson:"_id,omitempty" json:"id"`
	Name     string       `bson:"Name"          json:"name"`
	Formulas []DB_Formula `bson:"Formulas"      json:"formulas"`
}

type DB_Formula struct {
	Solver  string   `bson:"Solver"  json:"solver"`
	Setter  string   `bson:"Setter"  json:"setter"`
	Tags    []string `bson:"Tags"    json:"tags"`
	Formula []string `bson:"Formula" json:"formula"`
	Index   int32    `bson:"Index"   json:"index"`
}

type Card_Skeleton struct {
	Index string
	ID    int32
}
