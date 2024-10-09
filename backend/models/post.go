package models

import "html/template"

//****** IMAGE ******//
type PostImage struct {
	Title       string
	Date        string
	Body        PostImageBody
	Interations []Iteration
	Comments    []Comment
}

type PostImageBody struct {
	ImagePaths []string
	Text       string
}

//****** TEXT ******//
type PostText struct {
	Title       string
	Date        string
	Body        string
	Interations []Iteration
	Comments    []Comment
}

//****** GENERAL ******//
type Comment struct {
	Author string
	Date   string
	Body   string
}

type Iteration struct {
	Icon  template.HTML
	Count int
}
