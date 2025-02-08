import "server-only";
import { defineLive } from "next-sanity";
import { client } from './client'

//set your viewer token
const token = process.env.SANITY_API_READ_TOKEN;
if(!token){
  throw new Error('SANITY_API_TOKEN is missing')
}

export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  }
});