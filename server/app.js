'use strict'

/**
 * Dependencies
 */

const express = require('express')
const express_graphql = require('express-graphql')
const helmet = require('helmet')
const cors = require('cors')

/**
 * Load environment variables
 */

require('dotenv').config()

/**
 * Define app
 */

const app = express()

/**
 * Constants
 */

const port = process.env.PORT || 8080
const env = process.env.NODE_ENV || "development"

/**
 * Settings
 */

app.set("env", env)
app.disable("x-powered-by")
app.set("json spaces", 2)

/**
 * Middleware
 */

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Routes
 */

app.use('/', express_graphql({
  schema: require('../api/schema')(app),
  graphiql: true
}))

/**
 * Error handlers
 */

app.use((req, res, next) => {
  let err = new Error()
  err.status  = 404
  err.message = "Not found"

  next(err)
})

app.use((err, req, res, next) => {
  err.status = (err.status || 500)
  err.message = (err.message || "Internal Server Error")
  if (env === "production") { err.stack = undefined }

  console.error(err.message)

  res.status(err.status).render("error", {
    "status": err.status,
    "error": err
  })
})

/**
 * Start server
 */

async function start_server() {
  /**
   * Start listening for requests.
   */

  const server = app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
  })

  /**
   * Set process title.
   */

  process.title = 'graphql'
}

if (module === require.main) {
  start_server()
}

/**
 * Export app
 */

module.exports = app
