import React from 'react'
import styled, { css } from 'styled-components'
import Resizer from './lib/re-siz-able'
import SocialPost, {
  Name,
  Close,
  PostContainer,
  Description,
} from './components/SocialPost'
import CustomHandle from './components/CustomHandle'
import PostWithHook from './components/PostWithHook'
import PlaygroundLayout from './components/PlaygroundLayout'
import { SCREEN_SIZE } from './constants'

const Square = styled.div`
  height: 20rem;
  width: 20rem;
  background: #000;

  @media screen and (max-width: ${SCREEN_SIZE.MOBILE}) {
    height: 10rem;
    width: 10rem;
  }
`

const CenteredContainer = styled.div`
  justify-self: center;
`

const RightContainer = styled.div`
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const containerCss = css`
  width: 100%;
  height: 40rem;
  padding: 1.5rem;
  background: #f5f3f3;
`

const CenteredTallContainer = styled.div`
  ${containerCss}
  justify-self: center;

  @media screen and (max-width: ${SCREEN_SIZE.MOBILE}) {
    width: 100vw;
  }
`

const TallContainer = styled.div`
  ${containerCss}

  @media screen and (max-width: ${SCREEN_SIZE.MOBILE}) {
    justify-self: center;
    width: 100vw;
  }
`

const ElementAtBottomContainer = styled.div`
  ${containerCss}
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media screen and (max-width: ${SCREEN_SIZE.MOBILE}) {
    justify-self: center;
    width: 100vw;
  }
`

const App = () => (
  <PlaygroundLayout>
    <div>
      <Description>
        A div wrapped with the Resizer component. Only the right handle is
        enabled. Min width is set to 160px and max to 600px
      </Description>
      <Resizer handles={['right']} maxWidth={600}>
        <Square />
      </Resizer>
    </div>

    <CenteredContainer>
      <Resizer handles={['right', 'left']} hideHandles minWidth={200}>
        <PostContainer>
          <Name>John Doe</Name>
          <Close />
          <div>
            HTML SocialPost wrapped with the Resizer component. Left and right
            handles are enabled but not visible. Min width is set to 300px
          </div>
        </PostContainer>
      </Resizer>
    </CenteredContainer>

    <RightContainer>
      <Description>
        A div wrapped with the Resizer component. Only the left handle is
        enabled and a custom component is used for it. Min width is set to
        160px, max to 800px.
      </Description>
      <Resizer
        handles={['left']}
        customHandle={CustomHandle}
        minWidth={160}
        maxWidth={800}
      >
        <Square />
      </Resizer>
    </RightContainer>

    <CenteredTallContainer>
      <SocialPost />
    </CenteredTallContainer>

    <TallContainer>
      <Description>
        A div wrapped with the Resizer component. Bottom-right handle is
        enabled. Min width is set to 160px, max to 500px and max height to
        500px. Min height to 150 and max to 500px.
      </Description>
      <Resizer
        handles={['bottom-right']}
        minWidth={160}
        maxWidth={500}
        maxHeight={500}
      >
        <Square />
      </Resizer>
    </TallContainer>

    <Description style={{ marginBottom: -32 }}>
      A div wrapped with the Resizer component. Bottom-right, top-right and
      right handles are enabled. When using bottom-right and top-right handles
      the dimention ratio of is preserved. Can be observed with the help of the
      right handle. Max width and height are set to 500px.
    </Description>
    <ElementAtBottomContainer>
      <Resizer
        handles={['right', 'top-left', 'top-right']}
        preserveRatio
        maxHeight={500}
        maxWidth={500}
      >
        <Square />
      </Resizer>
    </ElementAtBottomContainer>

    <CenteredTallContainer>
      <PostWithHook />
    </CenteredTallContainer>
  </PlaygroundLayout>
)

export default App
