package repository

import (
	"backend/models"
	"fmt"

	"gorm.io/gorm"
)

func NewShowSchedule(db *gorm.DB) repoDB {
	return repoDB{db}
}

func (repo repoDB) PostShowSchedule(data models.ShowSchedule) error {
	if err := repo.Db.Create(&data).Error; err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func (repo repoDB) GetShowSchedule() ([]models.ShowSchedule, error) {
	var schedule []models.ShowSchedule

	if err := repo.Db.Preload("Film").Preload("Studio").Find(&schedule).Error; err != nil {
		return nil, err
	}

	return schedule, nil
}

func (repo repoDB) GetShowFilmByID(id uint, film *models.Film) error {
	if err := repo.Db.First(film, id).Error; err != nil {
		return err
	}
	return nil
}

func (repo repoDB) GetShowStudioByID(id uint, studio *models.Studio) error {
	if err := repo.Db.First(studio, id).Error; err != nil {
		return err
	}
	return nil
}

func (repo repoDB) GetShowScheduleByFilmID(id string) (schedule []models.ShowSchedule, err error) {
	if err := repo.Db.Preload("Film").Preload("Studio").Where("film_id = ?", id).Find(&schedule).Error; err != nil {
		return []models.ShowSchedule{}, err
	}
	return
}

func (repo repoDB) GetShowSchedulesByFilmAndStudio(id_film string, id_studio string) (schedule []models.ShowSchedule, err error) {
	if err := repo.Db.Preload("Film").Preload("Studio").Where("film_id = ? and studio_id = ?", id_film, id_studio).Find(&schedule).Error; err != nil {
		return []models.ShowSchedule{}, err
	}
	return
}

func (repo repoDB) GetDistinctFilms() ([]models.Film, error) {
	var films []models.Film

	err := repo.Db.Table("show_schedules").
		Select("DISTINCT ON (film_id) film_id, *").
		Joins("JOIN films ON show_schedules.film_id = films.id").Preload("Genres").
		Find(&films).Error
	if err != nil {
		return nil, err
	}
	return films, nil
}

func (repo repoDB) GetShowScheduleByIDSchedule(id string) (schedule *models.ShowSchedule, err error) {
	// repo.Db.First(schedule, scheduleID).Error
	if err := repo.Db.Preload("Film").Preload("Film.Genres").Preload("Studio").First(&schedule, "id=?", id).Error; err != nil {
		return nil, err
	}
	return schedule, nil
}
