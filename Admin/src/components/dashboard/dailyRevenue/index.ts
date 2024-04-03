import styled from "@emotion/styled";
import { Typography, Timeline as AntdTimeline } from "antd";

export const Timeline = styled(AntdTimeline)`
  .ant-timeline-item-head {
    background-color: transparent;
  }
`;

export const TimelineItem = styled(AntdTimeline.Item)``;

export const TimelineContent = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 6px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const CreatedAt = styled(Typography.Text)`
  font-size: 12px;
  cursor: default;
`;

export const Number = styled(Typography.Text)`
  cursor: pointer;
`;

export const NewCustomersWrapper = styled.div`
  height: 232px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    height: 212px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const HeaderNumbers = styled.div`
  font-size: 28px;
  text-align: right;
  line-height: 1.2;

  div {
    font-size: 20px;
  }

  img {
    margin-left: 5px;
  }

  @media screen and (max-width: 576px) {
    font-size: 30px;

    div {
      font-size: 20px;
    }
  }
`;