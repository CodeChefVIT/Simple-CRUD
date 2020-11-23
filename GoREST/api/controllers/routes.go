package controllers

import (
	"github.com/44t4nk1/Simple-CRUD/GoREST/api/middlewares"
)

func (s *Server) initializeRoutes() {
	s.Router.POST("/books", middlewares.SetMiddlewareJSON(s.CreateBook))
	s.Router.GET("/books", middlewares.SetMiddlewareJSON(s.GetBooks))
	s.Router.GET("/books/:uuid", middlewares.SetMiddlewareJSON(s.GetBook))
	s.Router.PUT("/books/:uuid", middlewares.SetMiddlewareJSON(s.UpdateBook))
	s.Router.DELETE("/books/:uuid", middlewares.SetMiddlewareJSON(s.DeleteBook))
}
