package repository

import (
	"backend/models"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/joho/godotenv"
)

func NewTransaction(data models.Transaction) dataTrans {
	return dataTrans{data}
}

type dataTrans struct {
	data models.Transaction
}

// implement
func (data dataTrans) TransactionPost(data1 models.Transaction) (models.ResponseTrans, error) {
	client := &http.Client{}

	var response models.ResponseTrans

	if err := godotenv.Load(); err != nil {
		return models.ResponseTrans{}, err
	}

	dataJson, err := json.Marshal(data1)

	if err != nil {
		return models.ResponseTrans{}, err
	}

	req, errReq := http.NewRequest(http.MethodPost, "https://app.sandbox.midtrans.com/snap/v1/transactions", bytes.NewBuffer(dataJson))

	if errReq != nil {
		return models.ResponseTrans{}, errReq
	}

	req.SetBasicAuth("SB-Mid-server-vU0LLU6mFIaP0S6fO4EpEVsx", "")
	// syntax
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	res, errRes := client.Do(req)

	if errRes != nil {
		return models.ResponseTrans{}, errRes
	}

	body, _ := io.ReadAll(res.Body)
	json.Unmarshal(body, &response)

	fmt.Println(string(body))

	fmt.Println(res.StatusCode)

	fmt.Println(response)

	return response, nil
}
