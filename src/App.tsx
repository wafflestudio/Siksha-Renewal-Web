import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { TopContainer } from './Home'
import ContextProvider from './utils/ContextProvider'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #f8f8f8;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <ContextProvider>
        <TopContainer />
      </ContextProvider>
    </>
  )
}

export default App;
