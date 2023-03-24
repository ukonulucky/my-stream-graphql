import React from "react";

export type streamType = {
    guestName: string,
    publishedAt: null,
    streamDate: string,
    streamSlug: string,
    streamImage: {
      url: string
    },
    title: string,
    updatedAt: string,
    streamDescription:{
      html: any
    }

}

export type streamTypesArray =  []


export type propTypes = {
    propsStream: streamType
    
  }
  
export  type paramsType = {
    slug: streamType
  }
  
 export  type getStaticPropsTypes = {
    params: paramsType
  }
  
