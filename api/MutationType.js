'use strict'

module.exports = (app) => {
  /**
   * Dependencies
   */

  const graphql = require('graphql')

  /**
   * Constants
   */

  // https://graphql.org/graphql-js/type/#graphqlobjecttype
  const GraphQLObjectType = graphql.GraphQLObjectType

  /**
   * Define type
   */

  const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root type for implementing GraphQL mutations.',
    fields: { }
  })

  /**
   * Export type
   */

  return MutationType
}
