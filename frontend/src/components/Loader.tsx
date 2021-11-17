import { CSSProperties, FC, Fragment } from "react";
import styled from "styled-components";
import Pin from "@assets/Pin";

const FullscreenWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

interface Props {
  fullscreen?: boolean;
  width?: CSSProperties["width"];
}
const Loader: FC<Props> = ({ fullscreen, width }) => {
  const Wrapper = fullscreen ? FullscreenWrapper : Fragment;

  return (
    <Wrapper>
      <Pin animate style={{ width: width ?? (fullscreen ? "25rem" : "8rem") }} />
    </Wrapper>
  );
};

export default Loader;
