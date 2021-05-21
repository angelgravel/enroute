import { FC } from "react";
import styled from "styled-components";

const HEIGHT = 256.12;
const WIDTH = 171.08;

type BasicCardWrapperProps = {
  rotate?: boolean;
};
const BasicCardWrapper = styled.div<BasicCardWrapperProps>`
  background-color: #fff;
  border: 1px solid rgb(180, 180, 180); // TODO: remove?
  width: 100%;
  padding-top: ${({ rotate }) =>
    (rotate ? WIDTH / HEIGHT : HEIGHT / WIDTH) * 100}%;
  position: relative;
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
};
const BasicCard: FC<BasicCardProps> = ({ children, style, rotate = false }) => {
  return (
    <BasicCardWrapper style={style} rotate={rotate}>
      <BasicCardContent>{children}</BasicCardContent>
    </BasicCardWrapper>
  );
};

export default BasicCard;
