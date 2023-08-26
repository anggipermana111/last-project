package middleware

import (
	"backend/helper"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gin-gonic/gin"
)

func AuthHandle() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		cookies, err := ctx.Cookie("token")

		if err != nil || cookies == "" {
			helper.Response(ctx, http.StatusUnauthorized, map[string]any{
				"Error": err,
			})
			return
		}

		token, errToken := jwt.Parse(cookies, func(token *jwt.Token) (interface{}, error) {
			if token.Method != jwt.GetSigningMethod("HS256") {
				return nil, errors.New("Algoritma error salah!")
			}
			return os.Getenv("SECRET"), nil
		})

		if errToken != nil {
			helper.Response(ctx, http.StatusUnauthorized, map[string]any{
				"Error": errToken,
			})
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)

		if !token.Valid || !ok {
			helper.Response(ctx, http.StatusUnauthorized, map[string]any{
				"Error": "Token tidak valid",
			})
			return
		}

		exp := claims["exp"].(*jwt.Time)

		if time.Now().After(exp.Time) {
			helper.Response(ctx, http.StatusUnauthorized, map[string]any{
				"Error": "Token expired",
			})
			return
		}

		role := claims["Role"].(string)

		if role != "admin" {
			helper.Response(ctx, http.StatusUnauthorized, map[string]any{
				"Error": "Unauthorized",
			})
			return
		}

		ctx.Next()
	}
}

func AuthHandleUser() gin.HandlerFunc {
	fmt.Println("Masuk Auth User")
	return func(ctx *gin.Context) {
		cookies, err := ctx.Cookie("token")

		if err != nil || cookies == "" {
			// fmt.Println(err, cookies)
			fmt.Println("error 1")
			helper.Response(ctx, http.StatusUnauthorized, map[string]interface{}{
				"Error": "Token missing",
			})
			return
		}

		token, errToken := jwt.Parse(cookies, func(token *jwt.Token) (interface{}, error) {
			if token.Method != jwt.GetSigningMethod("HS256") {
				return nil, errors.New("Algoritma error salah!")
			}
			return []byte(os.Getenv("SECRET")), nil
		})

		if errToken != nil {
			fmt.Println("error 2")
			helper.Response(ctx, http.StatusUnauthorized, map[string]interface{}{
				"Error": "Failed to parse token",
			})
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)

		if !token.Valid || !ok {
			helper.Response(ctx, http.StatusUnauthorized, map[string]any{
				"Error": "Token tidak valid",
			})
			return
		}

		// exp := claims["exp"].(*jwt.Time)
		// exp := claims["exp"].(float64)
		exp := int64(claims["exp"].(float64))
		if time.Now().Unix() > exp {
			helper.Response(ctx, http.StatusUnauthorized, map[string]interface{}{
				"Error": "Token expired",
			})
			return
		}
		// exp := time.Unix(int64(exp), 0)
		// if time.Now().After(exp) {
		// 	helper.Response(ctx, http.StatusUnauthorized, map[string]interface{}{
		// 		"Error": "Token expired",
		// 	})
		// 	return
		// }

		// if time.Now().After(exp.Time) {
		// 	helper.Response(ctx, http.StatusUnauthorized, map[string]any{
		// 		"Error": "Token expired",
		// 	})
		// 	return
		// }

		// role := claims["Role"].(string)

		// if role != "admin" {
		// 	helper.Response(ctx, http.StatusUnauthorized, map[string]any{
		// 		"Error": "Unauthorized",
		// 	})
		// 	return
		// }

		ctx.Next()
	}
}
