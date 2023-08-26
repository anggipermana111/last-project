package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/middleware"
	"backend/models"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type usecaseFilm struct {
	repo controller.RepoFilm
}

func (use usecaseFilm) UsePostFilm(contex *gin.Context) {
	var data struct {
		Judul        string    `json:"judul"`
		Poster       string    `json:"poster"`
		Deskripsi    string    `json:"deskripsi"`
		Trailer      string    `json:"trailer"`
		Rating       float32   `json:"rating"`
		TanggalRilis time.Time `json:"tanggal_rilis"`
		Genres       []uint    `json:"genres"`
	}

	if err := contex.ShouldBindJSON(&data); err != nil {
		fmt.Println("Error should bind JSON")
		helper.Response(contex, http.StatusBadRequest, map[string]interface{}{"Error": err.Error()})
		return
	}

	// Buat data Film baru
	var film models.Film
	film.Judul = data.Judul
	film.Poster = "http://localhost:8080/assets/" + data.Poster
	film.Deskripsi = data.Deskripsi
	film.Trailer = data.Trailer
	film.Rating = data.Rating
	film.TanggalRilis = data.TanggalRilis

	// Ambil genre-genre berdasarkan ID
	var genres []models.Genre
	if err := use.repo.GetGenresByIds(data.Genres, &genres); err != nil {
		fmt.Println("Error genre")
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}
	film.Genres = genres

	if err := use.repo.PostFilm(film); err != nil {
		fmt.Println("Error post film")
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]interface{}{"Response": "Berhasil Tambah Film Baru"})
}

// func (use usecaseFilm) UsePostFilm(contex *gin.Context) {
// 	var data struct {
// 		Judul        string  `json:"judul" gorm:"column:judul;type:character varying(150)"`
// 		Poster       string  `json:"poster" gorm:"column:poster;type:character varying(150)"`
// 		Deskripsi    string  `json:"deskripsi" gorm:"column:deskripsi"`
// 		Trailer      string  `json:"trailer" gorm:"column:trailer;type:character varying(150)"`
// 		Rating       float32 `json:"rating" gorm:"column:rating"`
// 		TanggalRilis string  `json:"tangal_rilis" gorm:"column:tangal_rilis;type:date"`
// 		Genres       []uint  `gorm:"many2many:film_genres;"`
// 	}

// 	if err := contex.ShouldBindJSON(&data); err != nil {
// 		fmt.Println("Error should bind json")
// 		helper.Response(contex, http.StatusBadRequest, map[string]interface{}{"Error": err.Error()})
// 		return
// 	}

// 	// Buat data Film baru
// 	film := models.Film{
// 		Judul := data.Judul,

// 	}

// 	// Ambil genre-genre berdasarkan ID
// 	var genres []models.Genre
// 	if err := use.repo.GetGenresByIds(data.Genres, &genres); err != nil {
// 		fmt.Println("Error genre")
// 		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
// 		return
// 	}
// 	film.Genres = genres

// 	if err := use.repo.PostFilm(film); err != nil {
// 		fmt.Println("Error post film")
// 		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
// 		return
// 	}

// 	helper.Response(contex, http.StatusOK, map[string]interface{}{"Response": "Berhasil Tambah Film Baru"})
// }

// func (use usecaseFilm) UsePostFilm(contex *gin.Context) {
// 	var data models.Film

// 	if err := contex.ShouldBindJSON(&data); err != nil {
// 		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
// 		return
// 	}

// 	if err := use.repo.PostFilm(data); err != nil {
// 		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
// 		return
// 	}

// 	helper.Response(contex, http.StatusOK, map[string]any{"Response": "Berhasil Tambah Film Baru"})
// }

// func (use usecaseFilm) UseGetFilm(contex *gin.Context) {
// 	res, err := use.repo.GetFilm()

// 	if err != nil {
// 		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
// 		return
// 	}

// 	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
// }

func (use usecaseFilm) UseGetFilm(contex *gin.Context) {
	films, err := use.repo.GetFilmWithGenres()

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]interface{}{"Response": films})
}

func (use usecaseFilm) UseGetFilmById(contex *gin.Context) {
	type Input struct {
		Id string `uri:"id"`
	}

	var input Input

	if err := contex.ShouldBindUri(&input); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	res, err := use.repo.GetFilmById(input.Id)

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func (use usecaseFilm) UseUpdateFilm(contex *gin.Context) {
	id := contex.Param("id")
	var data models.Film

	if err := contex.ShouldBindJSON(&data); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	if err := use.repo.UpdateFilm(id, data); err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": "Berhasil Update Film Baru"})
}

// func (use usecaseFilm) UseDelete(contex *gin.Context) {

// }

func NewFilm(repo controller.RepoFilm, r *gin.RouterGroup) {
	rep := usecaseFilm{repo}

	v2 := r.Group("film")

	v2.POST("add-film", rep.UsePostFilm)
	v2.GET("get-film", rep.UseGetFilm)
	v2.GET("get-film/:id", rep.UseGetFilmById)
	v2.PUT("update-film/:id", middleware.AuthHandle(), rep.UseUpdateFilm)
}
