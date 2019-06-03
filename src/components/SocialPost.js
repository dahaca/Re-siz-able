import React from 'react'
import styled from 'styled-components'
import Resizer from '../lib/Resizable/Resizer'

export const PostContainer = styled.div`
  position: relative;
  height: 20rem;
  width: 35rem;
  padding: 6rem 2.5rem 2.5rem 2.5rem;
  background: #fff;
  box-shadow: 0px 5px 10px 0 #d2d2d2;
  border-radius: 10px;
  border-bottom: 15px solid #87cefa;
`

export const Name = styled.div`
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  font-size: 2rem;
  font-weight: 500;
`

export const Close = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background: #000;
`

export const Description = styled.div`
  max-width: 30rem;
  margin-bottom: 2rem;
  line-height: 1.7rem;
`

const SocialPost = () => (
  <Resizer handles={['bottom', 'right', 'left']} minHeight={150} minWidth={250}>
    <PostContainer>
      <Name>John Doe</Name>
      <Close />
      <Description>
        A functional component which internally uses the Resizer component.
        Bottom, right and left handles are enabled. Min width is set to 250px,
        min height to 150 and max to 500px.
      </Description>
    </PostContainer>
  </Resizer>
)

export default SocialPost
