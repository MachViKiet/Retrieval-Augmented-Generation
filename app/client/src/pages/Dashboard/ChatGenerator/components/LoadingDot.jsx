import React from 'react'
import BubbleChatLeft from '~/components/Chatbots/BubbleChatLeft'
import LoadingDot from '~/components/LoadingDot'

function Loading() {
  return (
    <BubbleChatLeft
    text={<LoadingDot/>}
  />
  )
}

export default Loading