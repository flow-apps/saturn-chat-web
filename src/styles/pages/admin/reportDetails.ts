import styled from "styled-components";
import { ReportStatus } from "@_types/interfaces";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

export const AppContainer = styled.main`
  flex: 1;
  padding: 3rem;
  background-color: ${({ theme }) => theme.colors.background};
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const HeaderActions = styled.div`
  margin-bottom: 2rem;

  .back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.black || "#000"};
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
  }
`;

export const ReportDetailsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  .report-main-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;

    .tags-container {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.8rem;
    }

    h1 {
      font-size: 2rem;
    }

    .creation-date {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-top: 0.3rem;
    }
  }

  @media (max-width: 600px) {
    padding: 1.5rem;

    .report-main-info {
      flex-direction: column;
    }
  }
`;

export const TagBadge = styled.span<{ $variant?: "warning" | "default" }>`
  display: inline-flex;
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

export const StatusBadge = styled.span<{ $status: ReportStatus }>`
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ $status }) => {
    switch ($status) {
      case ReportStatus.OPEN:
        return "#ed6c02";
      case ReportStatus.FINISHED:
        return "#2e7d32";
      default:
        return "#777";
    }
  }};
`;

export const ReportDetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h2 {
    font-size: 1.3rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 0.5rem;
  }

  .reason-box {
    background-color: rgba(237, 108, 2, 0.05);
    padding: 1.2rem;
    border-radius: 8px;
    border-left: 4px solid #ed6c02;

    label {
      font-size: 0.85rem;
      font-weight: bold;
      color: #ed6c02;
    }

    p {
      font-size: 1.05rem;
      font-style: italic;
      margin-top: 0.4rem;
    }
  }

  .deleted-notice {
    font-style: italic;
    opacity: 0.7;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 8px;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const InfoGroup = styled.div`
  label {
    font-size: 0.85rem;
    opacity: 0.7;
    font-weight: bold;
    display: block;
  }

  p,
  a {
    font-size: 1.1rem;
    margin-top: 0.2rem;
  }

  a {
    font-weight: bold;
    color: inherit;
    text-decoration: underline;
  }
`;

export const UserOrGroupPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);

  .avatar-wrapper img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    font-size: 1.3rem;
  }

  p {
    opacity: 0.8;
  }

  .email {
    font-size: 0.85rem;
    opacity: 0.6;
    display: block;
    margin-top: 0.2rem;
  }

  .view-link {
    display: inline-block;
    margin-top: 0.6rem;
    font-size: 0.9rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary || "#0088ff"};
  }
`;

export const MessagePreviewCard = styled.div`
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .author-info {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        object-fit: cover;
      }

      div {
        display: flex;
        flex-direction: column;

        span {
          font-size: 0.85rem;
          opacity: 0.7;
        }
      }
    }

    .time {
      font-size: 0.8rem;
      opacity: 0.6;
    }
  }

  .reply-container {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    background-color: rgba(0, 0, 0, 0.04);
    padding: 0.8rem 1rem;
    border-radius: 8px;
    border-left: 3px solid ${({ theme }) => theme.colors.primary || "#0088ff"};

    small {
      font-weight: bold;
      opacity: 0.8;
    }

    p {
      font-size: 0.9rem;
      opacity: 0.9;
    }
  }

  .message-body {
    font-size: 1.1rem;
    line-height: 1.5;
    word-break: break-word;
  }

  .links-container {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    .link-card {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.8rem;
      background-color: #fff;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      text-decoration: none;
      color: inherit;

      p {
        font-size: 0.85rem;
        opacity: 0.7;
      }
    }
  }

  .message-footer {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    padding-top: 0.8rem;
    font-size: 0.85rem;
    opacity: 0.8;

    a {
      color: inherit;
      text-decoration: underline;
    }
  }
`;

export const AudioPlayer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  padding: 0.8rem 1.2rem;
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: fit-content;

  audio {
    height: 35px;
  }
`;

export const FilesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const FileAttachment = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;

  .file-info {
    display: flex;
    flex-direction: column;

    span {
      font-size: 0.9rem;
      font-weight: bold;
    }

    small {
      font-size: 0.75rem;
      opacity: 0.6;
    }
  }
`;

export const PollPreview = styled.div`
  background-color: #fff;
  padding: 1.2rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h4 {
    font-size: 1.1rem;
  }
`;

export const PollOptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  font-size: 0.95rem;

  small {
    font-weight: bold;
    opacity: 0.7;
  }
`;

export const ActionButtonsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ActionButton = styled.button<{
  $variant?: "primary" | "secondary" | "warning" | "danger" | "success";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  transition: opacity 200ms;

  background-color: ${({ $variant, theme }) => {
    switch ($variant) {
      case "success":
        return "#2e7d32";
      case "secondary":
        return "#777";
      case "warning":
        return "#ed6c02";
      case "danger":
        return theme.colors.red || "#d32f2f";
      default:
        return theme.colors.primary;
    }
  }};

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const DangerZoneCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.red || "#d32f2f"};
  border-radius: 8px;
  padding: 1.5rem;
  background-color: rgba(211, 47, 47, 0.03);

  h2 {
    color: ${({ theme }) => theme.colors.red || "#d32f2f"};
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 0.95rem;
    opacity: 0.8;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;

  h3 {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: bold;
    margin-top: 0.8rem;
    margin-bottom: 0.3rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.7rem;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: ${({ theme }) => theme.colors.background || "#fff"};
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.black || "#000"};
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    opacity: 0.8;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
    margin-top: 1.5rem;

    button {
      padding: 0.7rem 1.2rem;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: bold;

      &.confirm-ban {
        background-color: #ed6c02;
        color: #fff;
      }

      &.confirm-delete {
        background-color: ${({ theme }) => theme.colors.red || "#d32f2f"};
        color: #fff;
      }
    }
  }
`;
