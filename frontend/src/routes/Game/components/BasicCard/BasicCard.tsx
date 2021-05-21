import { FC } from "react";
import styled from "styled-components";

const HEIGHT = 256.12;
const WIDTH = 171.08;
const SHADOW =
  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

type BasicCardWrapperProps = {
  rotate?: boolean;
  raised?: boolean;
};
const BasicCardWrapper = styled.div<BasicCardWrapperProps>`
  background-color: #fff;
  border: 1px solid rgb(180, 180, 180); // TODO: remove?
  width: 100%;
  padding-top: ${({ rotate }) =>
    (rotate ? WIDTH / HEIGHT : HEIGHT / WIDTH) * 100}%;
  position: relative;
  box-shadow: ${({ raised }) => (raised ? SHADOW : 0)};
  transition: box-shadow 0.2s ease-in-out;
`;

const BasicCardContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

type BasicCardProps = {
  rotate: boolean;
  style: React.CSSProperties;
  raised?: boolean;
};
const BasicCard: FC<BasicCardProps> = ({
  children,
  style,
  rotate = false,
  raised = false,
}) => {
  return (
    <BasicCardWrapper style={style} rotate={rotate} raised={raised}>
      <BasicCardContent>{children}</BasicCardContent>
    </BasicCardWrapper>
  );
};

export default BasicCard;
