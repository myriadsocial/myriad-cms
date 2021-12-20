import React from 'react'
import ReactPlayer from 'react-player'

type Props = {
  url: string
}

export const Video: React.FC<Props> = ({url}) => {
  // TODO: display video
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      }}
    >
      <ReactPlayer url={url} controls={true} playing={false} stopOnUnmount={true} width={'100%'} />
    </div>
  )
}
