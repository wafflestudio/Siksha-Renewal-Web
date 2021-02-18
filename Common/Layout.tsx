import React, { ReactNode } from 'react'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

type Props = {
  children?: ReactNode
  title?: string
}

export const GlobalStyle = createGlobalStyle`
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

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <GlobalStyle />
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </div>
)

export default Layout