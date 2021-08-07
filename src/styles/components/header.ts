import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 25px;
`;

export const IconContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  img {
    width: 90px;
    height: 90px;
  }

  h1 {
    font-family: Poppins, sans-serif;
    font-size: 2.5rem;
    color: #fff;
    sup {
      font-family: Poppins;
      font-size: 1rem;
      font-weight: 200;
    }
  }
`

export const NavContainer = styled.nav`
`

export const NavOptions = styled.div`
  display: flex;
`

export const NavOption = styled.div`
  &:not(:last-child) {
    margin-right: 25px;
  }

  a {
    font-size: 1.6rem;
    font-weight: 600;
    color: #fff;
    text-align: center;
    line-height: 1.8rem;
  }
`
