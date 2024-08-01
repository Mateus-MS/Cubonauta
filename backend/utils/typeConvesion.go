package utils

import (
	"Cubonauta/models"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
)

func ConvertStringToInt(str string) int {
	integer, _ := strconv.Atoi(str)
	return integer
}

func ConvertBsonToObject(formula bson.M) models.DB_Case {
	var obj models.DB_Case
	bsonBytes, _ := bson.Marshal(formula)
	bson.Unmarshal(bsonBytes, &obj)

	return obj
}

func ConvertCaseToCard_Skeleton(formulas models.DB_Case) models.Card_Skeleton {
	var card_skeleton models.Card_Skeleton

	card_skeleton.ID = formulas.ID

	for i := 0; i < len(formulas.Formulas); i++ {
		card_skeleton.Index += strconv.Itoa(int(formulas.Formulas[i].Index))
		if i < len(formulas.Formulas)-1 {
			card_skeleton.Index += ":"
		}
	}

	return card_skeleton
}
