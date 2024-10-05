package utils

import (
	"fmt"
	"net/http"
	"net/url"
	"strings"
)

func UrlQuery(url *url.URL, query string) (string, int8) {
	result := url.Query().Get(query)

	if result == "" {
		return result, 1
	}

	return result, 0
}

func GetUrlCaseIndex(r *http.Request, categorySize int) int {
	caseIndexStr, err := UrlQuery(r.URL, "case_id")
	if err == 1 {
		fmt.Println("Id not received. Continuing with default")
		return 0
	}

	caseIndex := StringToInt(caseIndexStr)
	if caseIndex >= categorySize {
		fmt.Println("Id received bigger than list.")
		return categorySize
	}

	return caseIndex
}

func GetUrlCaseSize(r *http.Request) int {
	caseIndexStr, err := UrlQuery(r.URL, "size")
	if err == 1 {
		fmt.Println("Size not received. Continuing with default")
		return 1
	}

	return StringToInt(caseIndexStr)
}

func GetUrlCaseFilters(r *http.Request) []string {
	filterStr, err := UrlQuery(r.URL, "filters")
	if err == 1 {
		fmt.Println("None filter received. Continuing with default")
		return []string{}
	}

	return strings.Split(filterStr, ":")
}

func GetUrlCaseCategory(r *http.Request) string {
	categoryStr, err := UrlQuery(r.URL, "category")
	if err == 1 {
		fmt.Println("Category not received. Continuing with default")
		return "F2L"
	}

	return categoryStr
}
