package repository

import (
	"backend/models"

	"gorm.io/gorm"
)

func NewChair(db *gorm.DB) repoDB {
	return repoDB{db}
}

func (repo repoDB) GetChair() (dataChair []models.Chair, err error) {

	if err := repo.Db.Find(&dataChair).Error; err != nil {
		return nil, err
	}

	return
}

func (repo repoDB) UpdateChair(kode string, chair models.Chair) error {
	if err := repo.Db.Where("kode=?", kode).Updates(chair).Error; err != nil {
		return err
	}
	return nil
}

func (repo repoDB) GetAvailableChairs(orderID string) ([]models.Chair, error) {
	// var chairs []models.Chair

	// subquery := repo.Db.Model(&models.Order{}).
	// 	Select("chair_kode").
	// 	Where("order_id = ?", orderID)

	// if err := repo.Db.
	// 	Model(&models.Chair{}).
	// 	Select("kode").
	// 	Not(subquery).
	// 	Find(&chairs).Error; err != nil {
	// 	return nil, err
	// }

	// return chairs, nil

	var result []models.Chair

	var subqueryResults []string
	repo.Db.Model(&models.OrderChair{}).
		Select("chair_kode").
		Joins("JOIN orders ON orders.id = order_chairs.order_id").
		Where("orders.showschedule_id = ?", orderID).
		Find(&subqueryResults)

	repo.Db.Model(&models.Chair{}).
		Where("kode IN ?", subqueryResults).
		Find(&result)

	// repo.Db.Model(&models.Order{}).
	// 	Select("order_chairs.chair_kode").
	// 	Joins("JOIN order_chairs ON orders.id = order_chairs.order_id").
	// 	Where("orders.id = ?", orderID).
	// 	Find(&subquery)

	// repo.Db.Not("kode IN (?)", subquery).
	// 	Find(&result)

	// fmt.Println(result)

	return result, nil
}
