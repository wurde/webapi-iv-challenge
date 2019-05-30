'use strict'

module.exports = (app) => {
  /**
   * Dependencies
   */

  const graphql = require('graphql')

  /**
   * Constants
   */

  const GraphQLString = graphql.GraphQLString

  /**
   * Define config
   */

  const hello = {
    type: GraphQLString,
    description: "Return basic greeting.",
    resolve: () => {
      return (process.env.WELCOME || "Hello, world!")
    }
  }

  /**
   * Export config
   */

  return hello
}
