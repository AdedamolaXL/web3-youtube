import { VideoUploaded as VideoUploadedEvent } from "../generated/Youtube/Youtube"
import { VideoUploaded } from "../generated/schema"

export function handleVideoUploaded(event: VideoUploadedEvent): void {
  let entity = new VideoUploaded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Youtube_id = event.params.id
  entity.hash = event.params.hash
  entity.title = event.params.title
  entity.description = event.params.description
  entity.location = event.params.location
  entity.category = event.params.category
  entity.thumbnailHash = event.params.thumbnailHash
  entity.date = event.params.date
  entity.duration = event.params.duration
  entity.livepeerID = event.params.livepeerID
  entity.author = event.params.author

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
