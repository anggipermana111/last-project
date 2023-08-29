package repository

import "backend/models"

func (repo repoDB) GetUserByID(userID uint, user *models.User) error {
	return repo.Db.First(user, userID).Error
}

func (repo repoDB) GetShowScheduleByID(scheduleID uint, schedule *models.ShowSchedule) error {
	return repo.Db.First(schedule, scheduleID).Error
}

func (repo repoDB) GetChairByCode(chairCode string, chair *models.Chair) error {
	return repo.Db.Where("kode = ?", chairCode).First(chair).Error
}

func (repo repoDB) PostOrder(order models.Order) error {
	return repo.Db.Create(&order).Error
}
