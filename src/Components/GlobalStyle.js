import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'
import { themeGet } from 'styled-system'

// eslint-disable-next-line no-unused-expressions
export default createGlobalStyle`
  ${styledNormalize}

  body {
    color: ${themeGet('colors.font.primary')};
    background-color: ${themeGet('colors.bg')};
    font-size: 14px;
    font-family: ${themeGet('font')};
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  ::selection {
    background: ${themeGet('colors.primary')};
    color: ${themeGet('colors.white')};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  pre {
    border: 1px solid #ccc;
    background: rgba(0,0,0,0.1);
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.2);
    border-radius: 4px;
    padding: 20px;
    margin: 20px auto;
    max-width: 400px;
    text-align: left;
  }

  input, textarea {
    display: block;
    margin: 10px auto;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  .ReactModal__Body--open{
    overflow: hidden;
  }

  .Toastify .lbr-toast {
    .Toastify__toast {
      &--success {
        background: ${themeGet('colors.success')};
      }
      &--error {
        background: ${themeGet('colors.danger')};
      }
      &--info {
        background: ${themeGet('colors.secondary')};
      }
      &--warn {
        background: ${themeGet('colors.yellow')};
      }
    }
  }
`
