package cluster

import (
	"Cubonauta/models"
	"Cubonauta/utils"
	"errors"
)

var Users = map[string]models.Login{}

var userNotExist = errors.New("UserNotExist")
var userAlreadyExist = errors.New("UserAlreadyExist")

func SearchUser(username string) (models.Login, error) {
	if user, ok := Users[username]; ok {
		return user, nil
	}
	return models.Login{}, userNotExist
}

func CreateUser(username string, password string) error {
	//Check if already has a user with that username
	_, err := SearchUser(username)
	if err == nil {
		return userAlreadyExist
	}

	//Hash the password
	hashedPassword, _ := utils.HashPassword(password)

	//Store in DB the new user
	Users[username] = models.Login{
		HashPass: hashedPassword,
	}

	return nil
}

func AttUser(username string, data models.Login) error {
	_, error := SearchUser(username)

	if error != nil {
		return userNotExist
	}

	Users[username] = data

	return nil
}
