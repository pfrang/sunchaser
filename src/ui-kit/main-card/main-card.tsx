import styled, { keyframes } from "styled-components";

const AnimationLine = keyframes`
  0% { width: 0%}
  25% { width: 25%;}
  50% { width: 50%; margin-left: 25%; box-shadow: 0px 100px 30px 100px rgba(0, 0, 0, 0.2);}
  75% { width: 50%; margin-left: 50%}
  100% { width: 1%; margin-left: 99%}
`;

const AnimationSun = keyframes`
  0% { width: 0%;}
  /* 13% { width: 13%; top: 25%;}
  25% { width: 25%; top: 20%;} */
  50% { width: 50%; margin-left: 25%; top: 2%;}
  /* 75% { width: 50%; margin-left: 50%; top: 10%;} */
  100% { width: 1%; margin-left: 99%; top: 30%;}
`;

const AnimationMove = keyframes`
  0% { left: -75%;}
  /* 13% { width: 13%; top: 25%;}
  25% { width: 25%; top: 20%;} */
  50% { left: -50%;}
  /* 75% { width: 50%; margin-left: 50%; top: 10%;} */
  100% { left:0%;}
`;

const Wrapper = styled.div`
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  height: 300px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  animation: ${AnimationMove} 1s linear;
`;

export const MainCardAnimation = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
