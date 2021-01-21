import React from 'react'
import styled from '@emotion/styled'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import rangeParser from 'parse-numeric-range';


export type CodeBlockProps = {
  children: string
  className: string
  metastring: string
}

const Pre = styled.pre`
  text-align: left;
  font-size: 1rem;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
  border-radius: .25rem;
`;


const Line = styled.div`
  display: block;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

const LineWrapper = styled.div`
  display: table-row;
`

const calculateLinesToHighlight = (meta: string) => {
  const RE = /{([\d,-]+)}/
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)![1]
    const lineNumbers = rangeParser(strlineNumbers)
    return (index: any) => (lineNumbers.includes(index + 1))
  } else {
    return () => false
  }
}

export const CodeBlock = ({ children, className, metastring }: CodeBlockProps) => {
  // Pull the className
  const language = (className?.replace(/language-/, '') || "") as Language

  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  return (
    <Highlight {...defaultProps}
      code={children}
      language={language}
      theme={nightOwl}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={{ ...style }}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i })

            if (shouldHighlightLine(i)) {
              lineProps.className = `${lineProps.className} highlight-line`
            }
            return (
              // <LineWrapper>

              <Line key={i} {...lineProps}>
                {language !== `bash` && <LineNo>{i + 1}</LineNo>}
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
              // </LineWrapper>
            )
          }
          )}
        </Pre>
      )}
    </Highlight>
  )
}