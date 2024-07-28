package models

type Formula_Skeleton_Data struct {
	ID             int32    `bson:"_id,omitempty"   json:"id"`
	Name           string   `bson:"Name"            json:"name"`
	Formula        string   `bson:"Formula"         json:"formula"`
	FormulaReverse string   `bson:"Formula_Reverse" json:"formula_reverse"`
	FormulaArray   []string `bson:"Formula_Array"   json:"formula_array"`
}
