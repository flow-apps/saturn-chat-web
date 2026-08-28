import { ReportStatus } from "@_types/enums";
import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;
  flex-wrap: wrap;
`;

export const InputContainer = styled.div`
  display: flex;
  flex: 1;
  min-width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
`;

export const ReportInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0.9rem 1.2rem;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.shape};
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  outline: none;
  border: none;
  color: #fff;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
`;

export const FilterSelect = styled.select`
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  border: none;
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  cursor: pointer;
  font-size: 0.95rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const ReportsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 2rem 0;
  width: 100%;
`;

export const ReportCard = styled.div<{ status: ReportStatus }>`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-left: 5px solid
    ${({ status }) => {
      switch (status) {
        case ReportStatus.OPEN:
          return "#ed6c02";
        case ReportStatus.FINISHED:
          return "#2e7d32";
        default:
          return "#777";
      }
    }};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

export const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

export const TagBadge = styled.span<{ $variant?: "warning" | "default" }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${({ $variant }) =>
    $variant === "warning" ? "rgba(237, 108, 2, 0.15)" : "rgba(0, 0, 0, 0.06)"};
  color: ${({ $variant }) => ($variant === "warning" ? "#ed6c02" : "inherit")};
`;

export const StatusBadge = styled.span<{ status: ReportStatus }>`
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ status }) => {
    switch (status) {
      case ReportStatus.OPEN:
        return "#ed6c02";
      case ReportStatus.FINISHED:
        return "#2e7d32";
      default:
        return "#777";
    }
  }};
`;

export const ReportContent = styled.div`
  .reason {
    font-size: 1.05rem;
    font-style: italic;
    margin-bottom: 0.8rem;
  }
`;

export const ReportInfoGroup = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  font-size: 0.9rem;

  label {
    font-weight: bold;
    margin-right: 0.4rem;
    opacity: 0.7;
  }

  a {
    font-weight: bold;
    color: inherit;
    text-decoration: underline;
  }
`;

export const ReportFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 1rem;
  flex-wrap: wrap;
  gap: 1rem;

  .date {
    font-size: 0.85rem;
    opacity: 0.6;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.6rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    font-weight: bold;
    font-size: 0.85rem;
    cursor: pointer;
    color: #fff;
    transition: opacity 200ms;

    &:hover {
      opacity: 0.9;
    }

    &.resolve {
      background-color: #2e7d32;
    }

    &.dismiss {
      background-color: #777;
    }

    &.delete {
      background-color: ${({ theme }) => theme.colors.red || "#d32f2f"};
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: flex-end;
  }
`;
