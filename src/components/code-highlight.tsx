// import { Pre, Line, LineNo, LineContent } from "./styles";
import { Highlight } from "prism-react-renderer";
import React from "react";
import { Line, LineContent, LineNo, Pre } from "../components/code-style";

const CodeHighlight: React.FunctionComponent<{code: any}> = ({code}) => {
  return (
    <Highlight code={code} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};

export default React.memo(CodeHighlight);
