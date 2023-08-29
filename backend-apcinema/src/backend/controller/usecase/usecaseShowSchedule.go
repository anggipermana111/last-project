package usecase

import (
	"backend/controller"
	"backend/helper"
	"backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type usecaseShowSchedule struct {
	repo controller.RepoShowSchedule
}

func (use usecaseShowSchedule) UsePostShowSchedule(ctx *gin.Context) {
	// var data models.ShowSchedule
	// var data struct {
	// 	Film    uint      `json:"film" binding:"required"`
	// 	Studio  uint      `json:"studio" binding:"required"`
	// 	Tanggal time.Time `json:"tanggal_tayang" binding:"required"`
	// 	Jam     string    `json:"jam_tayang" binding:"required"`
	// }

	var data models.ShowSchedule

	if err := ctx.ShouldBindJSON(&data); err != nil {
		fmt.Println(data)
		fmt.Println("Salah di bind json")
		helper.Response(ctx, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	// Load data Film berdasarkan ID
	var film models.Film
	if err := use.repo.GetShowFilmByID(data.FilmID, &film); err != nil {
		helper.Response(ctx, http.StatusNotFound, map[string]interface{}{"Error": "Film not found"})
		return
	}

	// Load data Studio berdasarkan ID
	var studio models.Studio
	if err := use.repo.GetShowStudioByID(data.StudioID, &studio); err != nil {
		helper.Response(ctx, http.StatusNotFound, map[string]interface{}{"Error": "Studio not found"})
		return
	}

	// Buat data Film baru
	// var schedule models.ShowSchedule
	// schedule.Film = film
	// schedule.Studio = studio
	// schedule.Tanggal = data.Tanggal
	// schedule.Jam = data.Jam

	if err := use.repo.PostShowSchedule(data); err != nil {
		helper.Response(ctx, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(ctx, http.StatusOK, map[string]any{"Response": "Berhasil Tambah Jadwal Baru"})
}

func (use usecaseShowSchedule) UseGetShowSchedule(contex *gin.Context) {
	schedule, err := use.repo.GetShowSchedule()

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]interface{}{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]interface{}{"Response": schedule})
}

func (use usecaseShowSchedule) UseGetShowScheduleByFilmID(contex *gin.Context) {
	// filmId := contex.Param("id")
	type Input struct {
		Id string `uri:"id"`
	}

	// fmt.Println(filmId)

	var input Input

	if err := contex.ShouldBindUri(&input); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	res, err := use.repo.GetShowScheduleByFilmID(input.Id)

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func (use usecaseShowSchedule) UseGetShowSchedulesByFilmAndStudio(contex *gin.Context) {
	// filmId := contex.Param("id")
	type Input struct {
		FilmID   string `uri:"film_id"`
		StudioID string `uri:"studio_id"`
	}

	// fmt.Println(filmId)

	var input Input

	if err := contex.ShouldBindUri(&input); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	res, err := use.repo.GetShowSchedulesByFilmAndStudio(input.FilmID, input.StudioID)

	if err != nil {
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func (use usecaseShowSchedule) UseGetDistinctFilms(ctx *gin.Context) {
	films, err := use.repo.GetDistinctFilms()
	if err != nil {
		helper.Response(ctx, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(ctx, http.StatusOK, map[string]any{"Response": films})
}

func (use usecaseShowSchedule) UseGetShowScheduleByIdSchedule(contex *gin.Context) {
	type Input struct {
		Id string `uri:"id"`
	}

	var input Input

	if err := contex.ShouldBindUri(&input); err != nil {
		helper.Response(contex, http.StatusBadRequest, map[string]any{"Error": err.Error()})
		return
	}

	res, err := use.repo.GetShowScheduleByIDSchedule(input.Id)

	if err != nil {
		fmt.Println("error disini")
		helper.Response(contex, http.StatusInternalServerError, map[string]any{"Error": err.Error()})
		return
	}

	helper.Response(contex, http.StatusOK, map[string]any{"Response": res})
}

func NewShowSchedule(repo controller.RepoShowSchedule, r *gin.RouterGroup) {
	rep := usecaseShowSchedule{repo}

	v2 := r.Group("schedule")

	v2.POST("add-schedule", rep.UsePostShowSchedule)
	v2.GET("get-schedule", rep.UseGetShowSchedule)
	v2.GET("get-schedule-by-film/:id", rep.UseGetShowScheduleByFilmID)
	v2.GET("get-film", rep.UseGetDistinctFilms)
	v2.GET("get-schedule-by-film-and-studio/:film_id/:studio_id", rep.UseGetShowSchedulesByFilmAndStudio)
	v2.GET("get-schedule-by-id/:id", rep.UseGetShowScheduleByIdSchedule)
}
