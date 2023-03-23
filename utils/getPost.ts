import {request, gql} from "graphql-request"

const graphQlEndPoint = process.env.NEXT_PUBLIC_GRAPHQL_END_POINT

export const  getPost =  async () => {
  const quary = gql`
  query MyQuery {
    postsConnection {
      edges {
        node {
          author {
            bio
            createdAt
          }
        }
      }
    }
  }
  `
console.log("this is coming from env",graphQlEndPoint)
 try {
    if(typeof graphQlEndPoint === "string"){
        const result:any = request(graphQlEndPoint, quary)
        console.log("this is the ",result)
        return result.postsConnection.edges
    } 
 } catch (error: any) {
    
    console.log(error.message)
 }
  
}