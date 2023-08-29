package models

type Transaction struct {
	DetailTransaction DetailTransaction `json:"transaction_details"`
}

type DetailTransaction struct {
	Order_Id    string `json:"order_id"`
	GrossAmount uint   `json:"gross_amount"`
}

type ResponseTrans struct {
	Token       string `json:"token"`
	RedirectUrl string `json:"redirect_url"`
}
