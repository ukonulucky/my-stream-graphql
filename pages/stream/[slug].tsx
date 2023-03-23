import { gql } from '@apollo/client'
import React from 'react'
import { client } from '../../appoloClient'


import { streamType, getStaticPropsTypes, propTypes } from "../../types"



function SingleStrem({propsStream}:propTypes) {
  console.log(propsStream)
  return (
    <div>
      {
      propsStream.guestName
      }
    </div>
  )
}

export async function getStaticPaths(){
    const {data} = await client.query({
        query: gql`
        query{
          streams {
            streamSlug 
          }
        }
        `
      })
console.log("this is coming from the getStatic paths", data)

const paths = data.streams.map((i:streamType) => {
 return {
  params: {
    slug:i.streamSlug
  }
 }
})
      return {
        paths,
        fallback: false
      }

}
export async function getStaticProps({params}:getStaticPropsTypes){

  const {slug} = params
  console.log("this is the slug", slug)
  const {data} = await client.query({
    query: gql`query getSingleStream($slug: String!){
      streams(where:{streamSlug:$slug} ) {
        guestName
        publishedAt
        streamDate
        streamSlug
        streamImage {
          url
        }
        title
        updatedAt
        streamDescription{
          raw
    }
        
      }
    }
    `,
    variables:{slug}
  })
  const streams:streamType[] = data.streams
  return {
    props:{
      propsStream: streams[0]
     }
  }

}
export default SingleStrem