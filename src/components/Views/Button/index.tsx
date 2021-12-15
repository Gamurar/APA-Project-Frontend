import styled from "styled-components";

const Button = styled.button`
  ${({ theme }) => theme.buttonFontStyle};
  appearance: none;
  background-color: ${({ theme }) => theme.accentColor};
  padding: 15px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  height: 48px;
  margin-top: auto;
  width: 100%;

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const SmallButton = styled(Button)`
    height: 32px;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 16.41px;
    border-radius: 8px;
`;

export default Button;
