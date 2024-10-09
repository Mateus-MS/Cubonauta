package components

import (
	"Cubonauta/models"
	"Cubonauta/utils"
	"html/template"
	"net/http"
	"strings"
)

func Post(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "https://cubonauta.com")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, X-CSRF-Token")
	w.Header().Set("Access-Control-Expose-Headers", "X-CSRF-Token")

	//Resolve pre-flight
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var postType string = getPostType(r)

	var dataTextBody = models.PostText{
		Title: "New World Record!",
		Date:  "22 aug 2024 • 14:37",
		Body:  "Let's consider, that the optimization of the mechanism can hardly be compared with The Dynamics of Large-Scale Facility (Paris Mead in The Book of the Application Interface)",
		Interations: []models.Iteration{
			{
				Icon:  template.HTML("&#xE800;"),
				Count: 56,
			},
			{
				Icon:  template.HTML("&#xE80C;"),
				Count: 34,
			},
		},
		Comments: []models.Comment{
			{
				Author: "Khelbia Terminelis",
				Date:   "22 aug 2024 • 14:37",
				Body:   "Let's consider, that the optimization of the mechanism can hardly be compared with The Dynamics of Large-Scale Facility (Paris Mead in The Book of the Application Interface)",
			},
		},
	}

	var dataImageBody = models.PostImage{
		Title: "New World Record!",
		Date:  "22 aug 2024 • 14:37",
		Body: models.PostImageBody{
			ImagePaths: []string{"", "", ""},
			Text:       "Let's consider, that the optimization of the mechanism can hardly be compared with The Dynamics of Large-Scale Facility (Paris Mead in The Book of the Application Interface)",
		},
		Interations: []models.Iteration{
			{
				Icon:  template.HTML("&#xE800;"),
				Count: 56,
			},
			{
				Icon:  template.HTML("&#xE80C;"),
				Count: 34,
			},
		},
		Comments: []models.Comment{
			{
				Author: "Khelbia Terminelis",
				Date:   "22 aug 2024 • 14:37",
				Body:   "Let's consider, that the optimization of the mechanism can hardly be compared with The Dynamics of Large-Scale Facility (Paris Mead in The Book of the Application Interface)",
			},
		},
	}

	if strings.Contains(r.UserAgent(), "Mobile") {
		switch postType {
		case "text":
			utils.RenderTemplate([]string{"./components/post/post.html", "./components/post/frags/actions.html", "./components/post/frags/comment.html", "./components/post/frags/body/textPost.html"}, w, dataTextBody)
		case "image":
			utils.RenderTemplate([]string{"./components/post/post.html", "./components/post/frags/actions.html", "./components/post/frags/comment.html", "./components/post/frags/body/imagePost.html"}, w, dataImageBody)
		case "publi":
			utils.RenderTemplate([]string{"./components/post/post.html", "./components/post/frags/actions.html", "./components/post/frags/comment.html", "./components/post/frags/body/imagePost.html"}, w, dataImageBody)
		}
	}

}

func getPostType(r *http.Request) string {
	postType := r.URL.Query().Get("type")
	if postType == "" {
		return "text"
	}
	return postType
}
