package middlewares

import (
	"github.com/gin-gonic/gin"
)

func SetMiddlewareJSON(c *gin.Context) gin.HandlerFunc {
	return gin.HandlerFunc(func(c *gin.Context) {
		c.ContentType()
	})
}
