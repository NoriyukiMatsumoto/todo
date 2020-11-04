import React from 'react'
import styled from 'styled-components'

const Copyright: React.FC = () => (
  <Footer>
    <p>
      Created by <a href="https://ryota-murakami.github.io/">Ryota Murakamai</a>
    </p>
    <p>
      Part of <a href="http://todomvc.com">TodoMVC</a>
    </p>
  </Footer>
)

export default Copyright

export const Footer = styled.footer`
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;

  p {
    line-height: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }

  a:hover {
    text-decoration: underline;
  }
`
