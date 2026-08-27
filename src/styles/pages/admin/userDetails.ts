import Image from "next/image";
import styled from "styled-components";

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

export const ProfileCard = styled.div`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  .user-main-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    h1 {
      font-size: 2rem;
    }

    p {
      opacity: 0.8;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 600px) {
    padding: 1.5rem;

    .user-main-info {
      flex-direction: column;
      text-align: center;
    }
  }
`;

export const UserAvatar = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

export const BadgeStatus = styled.span<{ $status: "active" | "banned" }>`
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ $status, theme }) =>
    $status === "active" ? "#2e7d32" : theme.colors.red || "#d32f2f"};
`;

export const UserDetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-size: 1.3rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 0.5rem;
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
  }

  p {
    font-size: 1.1rem;
    margin-top: 0.2rem;
  }
`;

export const ActionButtonsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ActionButton = styled.button<{
  $variant?: "primary" | "warning" | "danger" | "success";
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
      case "warning":
        return "#ed6c02";
      case "danger":
        return theme.colors.red || "#d32f2f";
      case "success":
        return "#2e7d32";
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

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input,
    textarea,
    select {
      width: 100%;
      padding: 0.8rem;
      border-radius: 6px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      outline: none;
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }
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