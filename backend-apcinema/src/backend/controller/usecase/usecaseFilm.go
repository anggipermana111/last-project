package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/models"
	"fmt"
	"mime/multipart"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type usecaseFilm struct {
	repo controller.RepoFilm
}

func (use usecaseFilm) UsePostFilm(contex *gin.Context) {

	var data struct {
		Judul        string                `form:"judul" binding:"required"`
		Poster       *multipart.FileHeader `form:"poster" binding:"required"`
		Deskripsi    string                `form:"deskripsi" binding:"required"`
		Trailer      string                `form:"trailer" binding:"required"`
		Rating       float32               `form:"rating" binding:"required"`
		TanggalRilis time.Time             `form:"tanggal_rilis" binding:"required"`
		Genres       []uint                `form:"genres" binding:"required"`
	}

	if err := contex.ShouldBind(&data); err != nil {
		fmt.Println("Error binding form data:", err)
		helper.Response(contex, http.StatusBadRequest, map[string]interface{}{"Error": err.Error()})
		return
	}

	// Save the uploaded file to the "public" directory
	posterPath := "assets/" + data.Poster.Filename
	if err := contex.SaveUploadedFile(data.Poster, "public/"+data.Poster.Filename); err != nil {
		fmt.Println("error upload file")
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	// Buat data Film baru
	var film models.Film
	film.Judul = data.Judul
	film.Poster = "http://localhost:8080/" + posterPath
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

	fmt.Println(film)

	if err := use.repo.PostFilm(film); err != nil {
		fmt.Println("Error post film")
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]interface{}{"Response": "Berhasil Tambah Film Baru"})

}

func (use usecaseFilm) UseUpdateFilm(contex *gin.Context) {
	id := contex.Param("id")
	var data struct {
		Judul        string                `form:"judul" binding:"required"`
		Poster       *multipart.FileHeader `form:"poster" binding:"required"`
		Deskripsi    string                `form:"deskripsi" binding:"required"`
		Trailer      string                `form:"trailer" binding:"required"`
		Rating       float32               `form:"rating" binding:"required"`
		TanggalRilis time.Time             `form:"tanggal_rilis" binding:"required"`
		Genres       []uint                `form:"genres" binding:"required"`
	}

	if err := contex.ShouldBind(&data); err != nil {
		fmt.Println("Error binding form data:", err)
		helper.Response(contex, http.StatusBadRequest, map[string]interface{}{"Error": err.Error()})
		return
	}

	// Save the uploaded file to the "public" directory
	fmt.Println(data.Poster.Size)
	posterPath := "assets/" + data.Poster.Filename
	if err := contex.SaveUploadedFile(data.Poster, "public/"+data.Poster.Filename); err != nil {
		fmt.Println("error upload file")
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	// Buat data Film baru
	var film models.Film
	film.Judul = data.Judul
	film.Poster = "http://localhost:8080/" + posterPath
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

	fmt.Println(film)

	// if err := use.repo.UpdateFilm(id, film); err != nil {
	// 	helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
	// 	return
	// }

	if err := use.repo.UpdateFilm(id, film); err != nil {
		fmt.Println("error di update film")
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	// Update genres for the film
	if err := use.repo.UpdateFilmGenres(id, film.Genres); err != nil {
		fmt.Println("error di update genre")
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]interface{}{"Response": "Berhasil Update Film Baru"})

	// helper.Response(contex, http.StatusOK, map[string]any{"Response": "Berhasil Update Film Baru"})
}
func (use usecaseFilm) UseGetFilm(contex *gin.Context) {
	films, err := use.repo.GetFilm()

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

// func (use usecaseFilm) UseDelete(contex *gin.Context) {

// }

func NewFilm(repo controller.RepoFilm, r *gin.RouterGroup) {
	rep := usecaseFilm{repo}

	v2 := r.Group("film")

	v2.POST("add-film", rep.UsePostFilm)
	v2.GET("get-film", rep.UseGetFilm)
	v2.GET("get-film/:id", rep.UseGetFilmById)
	// v2.PUT("update-film/:id", middleware.AuthHandle(), rep.UseUpdateFilm)
	v2.PUT("update-film/:id", rep.UseUpdateFilm)
}
