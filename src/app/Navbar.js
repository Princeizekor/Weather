"use client";
import styled from "styled-components";
import Button, { Actions, Dropdown, DropdownItem } from "./component/Button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const Units = [
    "Metric (°C, km/h)",
    "Imperial (°F, mph)",
    "Standard (K)",
    "Metric (°C, km/h)",
    "Imperial (°F, mph)",
    "Standard (K)",
    "Metric (°C, km/h)",
    "Imperial (°F, mph)",
    "Standard (K)",
  ];

  useEffect(() => {
    function onDocumentClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, []);

  function toggle() {
    setOpen((s) => !s);
  }

  function selectUnit(unit) {
    console.log("Selected unit:", unit);
    setOpen(false);
  }
  return (
    <Nav>
      <Image
        width={200}
        height={50}
        src="/assets/images/logo.svg"
        alt="Weather Icon"
        className="nav-img"
      />
      <Actions ref={containerRef}>
        <Button aria-haspopup="menu" aria-expanded={open} onClick={toggle}>
          <Image
            width={20}
            height={20}
            src="\assets\images\icon-units.svg"
            alt="drop Icon"
            className="wiget"
          />
          Units
          <Image
            width={20}
            height={20}
            src="\assets\images\icon-dropdown.svg"
            alt="drop Icon"
            className="wiget"
          />
        </Button>
        {open && (
          <Dropdown role="menu" aria-label="Units menu">
            {Units.map((unit, i) => (
              <DropdownItem
                key={i}
                role="menuitem"
                tabIndex={0}
                onClick={() => selectUnit(unit)}
              >
                {unit}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </Actions>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: space-between;
  background: hsl(243, 96%, 9%);
  height: 80px;
  align-items: center;
  width: 100vw;
  padding: 0rem 8rem 0rem 8rem;

  @media (max-width: 768px) {
    padding: 0rem 1rem 0rem 1rem;
    width: 100%;
    .nav-img {
      width: 130px;
    }
  }
`;
