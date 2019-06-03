import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Resizer from './lib/Resizable/Resizer'
import SocialPost, {
  Name,
  Close,
  PostContainer,
  Description,
} from './components/SocialPost'
import CustomHandle from './components/CustomHandle'
import PostWithHook from './components/PostWithHook'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Helvetica Neue';
    box-sizing: border-box;
  }
`

const Playground = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-rows: 1fr;
  min-height: 100vh;
  padding: 2rem 5rem;
`

const Title = styled.div`
  font-weight: 800;
  font-size: 6rem;
  margin-bottom: 2rem;
`

const Square = styled.div`
  height: 20rem;
  width: 20rem;
  background: #000;
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

const CenteredTallContainer = styled.div`
  justify-self: center;
  height: 40rem;
  padding: 1.5rem;
  background: #f5f3f3;
`

const TallContainer = styled.div`
  height: 40rem;
  padding: 1.5rem;
  background: #f5f3f3;
`

const ElementAtBottomConteiner = styled.div`
  width: 100%;
  height: 35rem;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: #f5f3f3;
`

const App = () => (
  <>
    <GlobalStyle />
    <Playground>
      <Title>A Cool Re–siz–able Demo</Title>

      <div>
        <Description>
          A div wrapped with the Resizer component. Only the right handle is
          enabled. Min width is set to 200px and max to 600px
        </Description>
        <Resizer handles={['right']} maxWidth={600}>
          <Square />
        </Resizer>
      </div>

      <CenteredContainer>
        <Description>
          JSX SocialPost wrapped with the Resizer component. Left and right
          handles are enabled but not visible. Min width is set to 300px
        </Description>
        <Resizer handles={['right', 'left']} hideHandles minWidth={300}>
          <PostContainer>
            <Name>John Doe</Name>
            <Close />
            <div>JSX wrapped with Resizer</div>
          </PostContainer>
        </Resizer>
      </CenteredContainer>

      <RightContainer>
        <Description>
          A div wrapped with the Resizer component. Only the left handle is
          enabled and a custom component is used for it. Min width is set to
          200px, max to 500px.
        </Description>
        <Resizer
          handles={['left']}
          customHandle={CustomHandle}
          minWidth={200}
          maxWidth={500}
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
          enabled. Min width is set to 200px, max to 500px and max height to
          500px. min height to 150 and max to 500px.
        </Description>
        <Resizer
          handles={['bottom-right']}
          minWidth={200}
          maxWidth={500}
          maxHeight={500}
        >
          <Square />
        </Resizer>
      </TallContainer>

      <Description>
        A div wrapped with the Resizer component. Bottom-right, top-right and
        right handles are enabled. When using bottom-right and top-right handles
        the dimention ratio of is preserved. Can be observed with the help of
        the right hangle. Max width and height are set to 500px.
      </Description>
      <ElementAtBottomConteiner>
        <Resizer
          handles={['right', 'top-left', 'top-right']}
          preserveRatio
          maxHeight={500}
          maxWidth={500}
        >
          <Square />
        </Resizer>
      </ElementAtBottomConteiner>

      <CenteredTallContainer>
        <PostWithHook />
      </CenteredTallContainer>
    </Playground>
  </>
)

export default App
