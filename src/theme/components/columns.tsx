import { styled } from "./styled";
import { Layout } from "./layout";

export const Columns = styled(Layout)<{ columns: number }>`
  display: block;
  columns: ${(props) => props.columns};
`;
