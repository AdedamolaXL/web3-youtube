import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { VideoUploaded } from "../generated/Youtube/Youtube"

export function createVideoUploadedEvent(
  id: BigInt,
  hash: string,
  title: string,
  description: string,
  location: string,
  category: string,
  thumbnailHash: string,
  date: string,
  duration: string,
  livepeerID: string,
  author: Address
): VideoUploaded {
  let videoUploadedEvent = changetype<VideoUploaded>(newMockEvent())

  videoUploadedEvent.parameters = new Array()

  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromString(hash))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "thumbnailHash",
      ethereum.Value.fromString(thumbnailHash)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromString(date))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("duration", ethereum.Value.fromString(duration))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("livepeerID", ethereum.Value.fromString(livepeerID))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )

  return videoUploadedEvent
}
