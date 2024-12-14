import { Message } from "ai/react"
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

export async function POST(req:Request,res:Response){
  const reqBody =  await req.json()
  console.log(reqBody)
  const messages :Message[] = reqBody.messages
  const userQuestion = messages[messages.length-1].content
  const reportData = reqBody.data.reportData


  const searchQuery=`Patient medical report says: \n ${reportData} \n User question: \n ${userQuestion}`

   return new Response("dummy response", {status: 200})
}