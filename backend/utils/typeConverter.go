package utils

import (
	"Cubonauta/models"
	"fmt"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
)

func StringToInt(str string) int {
	nconv, err := strconv.Atoi(str)

	if err != nil {
		fmt.Printf("Error while trying to convert %s.", str)
	}

	return nconv
}

func ConvertBsonToObject(formula bson.M) models.Case {
	var obj models.Case
	bsonBytes, _ := bson.Marshal(formula)
	bson.Unmarshal(bsonBytes, &obj)

	return obj
}
