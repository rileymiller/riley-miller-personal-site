import { css } from '@emotion/core'

export const global = css`
    pre {
      /* font-size: 1rem;
      padding: .5rem;
      border-radius: .4rem;
      overflow: none; */
    }

    pre, code, kbd, samp {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }

    code {
      /* background-color: rgb(1, 22, 39); */
      background-color: rgba(243, 244, 246, 1);
      font-size: 1.05rem;
      /* color: rgb(214, 222, 235); */
    }

    /**
    * Handles the actual highlighting process.
    * Feel free to customize this.
    */
    .highlight-line {
      background-color: rgb(53, 59, 69);
      display: block;
      margin-right: -1em;
      margin-left: -1em;
      padding-right: 1em;
      padding-left: 0.75em;
      border-left: 0.3em solid #f99;
    }
  `
export const flex = css`
  display: flex;
`

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`

export const flexCenter = css`
  justify-content: center;
  align-items: center;
`

export const clockwiseRotationAnimation = css`
      @keyframes clockwiseRotation {
        from {
          -webkit-transform: rotate(0deg);
        }
        to { 
          -webkit-transform: rotate(-360deg);
        }
      }
      -webkit-animation-name:             clockwiseRotation; 
      -webkit-animation-duration:         2s; 
      -webkit-animation-iteration-count:  infinite;
      -webkit-animation-timing-function: linear;
`

export const counterClockwiseRotationAnimation = css`
      @keyframes counterClockwiseRotation {
        from {
          -webkit-transform: rotate(0deg);
        }
        to { 
          -webkit-transform: rotate(360deg);
        }
      }
      -webkit-animation-name:             counterClockwiseRotation; 
      -webkit-animation-duration:         2s; 
      -webkit-animation-iteration-count:  infinite;
      -webkit-animation-timing-function: linear;
`