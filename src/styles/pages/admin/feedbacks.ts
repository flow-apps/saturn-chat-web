import styled from 'styled-components';

interface ICategoryProps {
  color: string;
  bg: string;
}

interface IFilterProps {
  active: boolean;
}

export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #f8f9fa;
`;

export const AppContainer = styled.main`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 32px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #1a1a1a;
  font-weight: 700;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 12px;
  width: 100%;
  max-width: 320px;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  background: transparent;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const FilterButton = styled.button<IFilterProps>`
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.active ? '#0070f3' : '#e2e8f0')};
  color: ${(props) => (props.active ? '#ffffff' : '#4a5568')};

  &:hover {
    opacity: 0.9;
  }
`;

export const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FeedbackCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #edf2f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const UserName = styled.strong`
  font-size: 15px;
  color: #2d3748;
`;

export const FeedbackDate = styled.span`
  font-size: 12px;
  color: #a0aec0;
`;

export const CategoryTag = styled.div<ICategoryProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bg};
`;

export const RatingContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
`;

export const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #718096;
`;