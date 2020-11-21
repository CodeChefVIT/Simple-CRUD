package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/google/uuid"

	"github.com/44t4nk1/Simple-CRUD/GoREST/api/models"

	"github.com/gin-gonic/gin"
)

//CreateBook ...
func (server *Server) CreateBook(c *gin.Context) {
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error reading records"})
		return
	}
	book := models.Book{}
	book.BeforeCreate()
	err = json.Unmarshal(body, &book)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error in JSON"})
		return
	}
	userCreated, err := book.SaveBook(server.DB)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not save data"})
		return
	}
	c.JSON(200, userCreated)
}

//GetBooks ...
func (server *Server) GetBooks(c *gin.Context) {
	book := models.Book{}
	books, err := book.FindAllBooks(server.DB)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
		return
	}
	c.JSON(http.StatusOK, books)
}

//GetBook ...
func (server *Server) GetBook(c *gin.Context) {
	id := c.Param("uuid")
	userid, err := uuid.Parse(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Could not parse UUID"})
		return
	}
	book := models.Book{}
	bookGotten, err := book.FindBookByID(server.DB, userid)
	c.JSON(http.StatusOK, bookGotten)
}
