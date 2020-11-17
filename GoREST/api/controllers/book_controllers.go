package controllers

import (
	"encoding/json"
	"io/ioutil"

	"github.com/44t4nk1/Simple-CRUD/GoREST/api/models"

	"github.com/gin-gonic/gin"
)

//CreateBook ...
func (server *Server) CreateBook(c *gin.Context) {
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.Error(err)
	}
	book := models.Book{}
	err = json.Unmarshal(body, &book)
	if err != nil {
		c.Error(err)
	}
	userCreated, err := book.SaveBook(server.DB)
	if err != nil {
		c.Error(err)
	}
	c.JSON(200, userCreated)
}
