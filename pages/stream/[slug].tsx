import { gql } from '@apollo/client'
import React from 'react'
import { client } from '../../appoloClient'


import { streamType, getStaticPropsTypes, propTypes } from "../../types"



function SingleStrem({propsStream}:propTypes) {
  console.log(propsStream)

  return (
    <div>
    <h2>
    {
      propsStream.guestName
      }
    </h2>
  <div dangerouslySetInnerHTML={{__html:propsStream.streamDescription.html}} />
    
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
          html
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