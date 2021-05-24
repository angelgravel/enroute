import { FC } from "react";
import styled from "styled-components";
import BasicCard from "../BasicCard";

const BackCardWrapper = styled.svg`
  width: 100%;
  height: 100%;
`;

const Polygon2 = styled.polygon`
  fill: #82a7c0;
  stroke: #d7e0ea;
  stroke-miterlimit: 10;
`;

const Polygon3 = styled.polygon`
  fill: #e7d9e6;
  stroke: #d6c7ba;
  stroke-miterlimit: 10;
`;

const Rect = styled.rect`
  stroke: #edc4d4;
  stroke-linejoin: round;
  stroke-width: 2px;
  fill: url(#backCardPattern);
`;

const Wrapper = styled.g`
  clip-path: url(#backCard_clipPath_1);
`;

type BackCardProps = {
  style?: React.CSSProperties;
};
const TrackCardBack: FC<BackCardProps> = ({ style = {} }) => {
  return (
    <BasicCard style={style} rotate hoverable interactable raised>
      <BackCardWrapper
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256.12 171.08"
      >
        <clipPath id="backCard_clipPath_1">
          <rect
            fill="#222"
            stroke="#000"
            strokeWidth="2px"
            x="12.806"
            y="8.554"
            height="152.972"
            width="256.12"
          />
        </clipPath>

        <pattern
          id="backCardPattern"
          data-name="backCardPattern"
          width="92.71"
          height="87.87"
          patternUnits="userSpaceOnUse"
          viewBox="0 0 90.71 87.87"
        >
          <g>
            <Polygon2 points="68.73 107.19 49.41 87.87 68.73 68.55 88.05 87.87 68.73 107.19" />
            <Polygon3 points="90.71 46.58 110.03 65.9 90.71 85.22 71.39 65.9 90.71 46.58" />
          </g>
          <g>
            <Polygon2 points="21.98 68.55 41.3 87.87 21.98 107.19 2.66 87.87 21.98 68.55" />
            <Polygon3 points="0 46.58 19.32 65.9 0 85.22 -19.32 65.9 0 46.58" />
          </g>
          <g>
            <Polygon2 points="68.73 19.32 49.41 0 68.73 -19.32 88.05 0 68.73 19.32" />
            <Polygon3 points="90.71 41.3 71.39 21.98 90.71 2.66 110.03 21.98 90.71 41.3" />
          </g>
          <g>
            <Polygon2 points="23.38 63.26 4.06 43.94 23.38 24.62 42.7 43.94 23.38 63.26" />
            <Polygon3 points="45.35 85.24 26.03 65.92 45.35 46.6 64.67 65.92 45.35 85.24" />
            <Polygon2 points="67.33 24.62 86.65 43.94 67.33 63.26 48.01 43.94 67.33 24.62" />
            <Polygon3 points="45.35 2.64 64.67 21.96 45.35 41.28 26.03 21.96 45.35 2.64" />
          </g>
          <g>
            <Polygon3 points="0 41.3 -19.32 21.98 0 2.66 19.32 21.98 0 41.3" />
            <Polygon2 points="21.98 -19.32 41.3 0 21.98 19.32 2.66 0 21.98 -19.32" />
          </g>
        </pattern>
        <Wrapper>
          <Rect x="12.806" y="8.554" height="152.972" width="256.12" />
        </Wrapper>
      </BackCardWrapper>
    </BasicCard>
  );
};

export default TrackCardBack;