package models

type Login struct {
	HashPass     string
	SessionToken string
	CSRFToken    string
}
