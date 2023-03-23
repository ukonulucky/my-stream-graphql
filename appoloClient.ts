import {ApolloClient, InMemoryCache, ApolloProvider, gql} from "@apollo/client"


console.log(process.env.NEXT_PUBLIC_GRAPHQL_END_POINT)

export const client  = new ApolloClient({
    uri:process.env.NEXT_PUBLIC_GRAPHQL_END_POINT,
    cache:new InMemoryCache()
})