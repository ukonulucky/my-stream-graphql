
import { gql } from '@apollo/client/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import { client } from '../appoloClient'
import { streamType, streamTypesArray } from "../types"


type propTypes = {
  propsStream: streamTypesArray
  
}
const Home: NextPage<propTypes> = ({propsStream}:propTypes) => {
  console.log("this is the stream prop", propsStream)


   return (
     <div className="container mx-auto px-10 mb-8">
     <Head>
       <title>Lucky Blog</title>
   </Head>
    <div>
    {
     propsStream.map((stream:streamType) =>  
    <div key={stream.streamSlug}>
     <a href={`stream/${stream.streamSlug
     }`} >{stream.guestName}</a>
     <img src={stream.streamImage.url
     } alt="" />
     </div>)
 }
 </div>
 </div>
    )
}


export async function getStaticProps(){
  const {data} = await client.query({
    query: gql`
    query{
      streams {
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
    `
  })
  const {streams} = data
  return {
    props:{
     propsStream: streams
    }
  }
}

export default Home
