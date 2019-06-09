import styled, { createGlobalStyle } from 'styled-components'
import React from 'react'
import { element, arrayOf } from 'prop-types'
import { SCREEN_SIZE } from '../constants'
const GlobalStyle = createGlobalStyle`
* {
    font-family: 'Helvetica Neue';
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
`

const Playground = styled.div`
  position: relative;
  display: grid;
  grid-gap: 4rem;
  grid-template-rows: 1fr;
  grid-template-columns: calc(100vw - 10rem);
  min-height: 100vh;
  padding: 2rem 5rem 4rem 5rem;

  @media screen and (max-width: ${SCREEN_SIZE.TABLET}) {
    padding: 2rem 2rem 4rem 2rem;
    grid-template-columns: calc(100vw - 4rem);
  }
`

const Title = styled.div`
  font-weight: 800;
  font-size: 6rem;
  margin-bottom: 2rem;

  @media screen and (max-width: ${SCREEN_SIZE.TABLET}) {
    font-size: 4.2rem;
  }
`
const Footer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  font-weight: 600;
`

const PlaygroundLayout = ({ children }) => (
  <>
    <GlobalStyle />
    <Playground>
      <Title>A Cool Re–siz–able Demo</Title>
      {children}
      <Footer>by Leonid Grishchenin</Footer>
    </Playground>
  </>
)

PlaygroundLayout.propTypes = {
  children: arrayOf(element).isRequired,
}

export default PlaygroundLayout
