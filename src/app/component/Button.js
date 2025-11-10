import styled from "styled-components";
const sizes = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
};

const device = {
  mobile: `(max-width: ${sizes.mobile})`,
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  desktop: `(max-width: ${sizes.desktop})`,
};

const Button = styled.button`
  // position: relative;
  width: 150px;
  height: 50px;
  display: flex;
  color: white;
  padding: 0.6rem 1.2rem;
  background: hsl(243, 23%, 20%);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;

  &:hover {
    // background: hsl(243, 27%, 20%);
  }
    @media (${device.tablet}) {
    width: 120px;
    height: 40px;
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    .wiget {
      width: 15px;
      height: 15px;
    }
  }
`;

const Actions = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 80px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  margin-top: 0.5rem;
  background: hsl(243, 23%, 20%);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
  padding: 0.4rem 0;
  min-width: 200px;
  z-index: 20;
  .imperial {
    width: 100%;
    padding: 0.6rem 1rem;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    font-size: 1rem;
    color: white;
    &:hover {
      background: hsl(243, 23%, 24%);
    }
  }
    h6 {
    margin: 0.5rem 1rem;
    font-size: 0.85rem;
    color: hsl(0, 0%, 70%);
    }
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.95rem;
  color: white;

  &:hover {
    background: hsl(243, 23%, 24%);
  }
`;

const Drop = styled.button`
  width: 120px;
  height: 40px;
  display: flex;
  color: white;
  padding: 0.6rem 0.6rem;
  background: hsl(243, 23%, 24%);
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;

  &:hover {
    // background: hsl(243, 27%, 20%);
  }
`;

const SearchButton = styled.button`
  width: 110px;
  height: 45px;
  color: white;
  background: hsl(233, 67%, 56%);
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    // background: hsl(248, 70%, 36%);
  }
    @media (max-width: 768px) {
    width: 100%;
    font-size: 1.2rem;
  }
`;

export { SearchButton, Drop, Actions, DropdownItem, Dropdown, Action };
export default Button;
