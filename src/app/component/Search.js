"use client";
import Image from "next/image";
import styled from "styled-components";
import { SearchButton } from "./Button";
import { useState, useEffect, useRef } from "react";
import openMeteo from "./lib/OpenMeteo";

const searchLocations = async (query) => {
  if (!query) return [];
  try {
    const response = await openMeteo.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: query,
          count: 10,
          language: "en",
          format: "json",
        },
      }
    );
    return (
      response.data.results?.map((place) => ({
        name: `${place.name}, ${place.country}`,
        latitude: place.latitude,
        longitude: place.longitude,
      })) ?? []
    );
  } catch (error) {
    console.error("Geocoding API error:", error);
    return [];
  }
};

export default function Search({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const searchTimeout = useRef(null);

  const performSearch = async (query) => {
    const q = (query ?? searchTerm).trim();
    if (!q) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
      searchTimeout.current = null;
    }
    setIsLoading(true);
    try {
      const results = await searchLocations(q);
      setSearchResults(results);
      setShowDropdown(true);
      if (results.length > 0) {
        const first = results[0];
        setSearchTerm(first.name);
        setShowDropdown(false);
        setSearchResults([]);
        if (typeof onSelect === "function") onSelect(first);
      }
    } catch (err) {
      console.error("Immediate search failed:", err);
      setSearchResults([]);
      setShowDropdown(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setShowDropdown(false);
      setSearchResults([]);
      return;
    }

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await searchLocations(value);
        setSearchResults(results);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPlace = (place) => {
    setSearchTerm(place.name);
    setShowDropdown(false);
    setSearchResults([]);
    if (typeof onSelect === "function") onSelect(place);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <h1>How is the sky looking today?</h1>
      <FormContainer onSubmit={handleFormSubmit}>
        <InputContainer ref={dropdownRef}>
          <Image
            width={20}
            height={20}
            src="\assets\images\icon-search.svg"
            alt="drop Icon"
          />
          <Input
            type="text"
            placeholder="Search for a place..."
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                performSearch(searchTerm);
              }
            }}
            onFocus={() => {
              if (searchTerm.trim() !== "") setShowDropdown(true);
            }}
          />
          {showDropdown && (
            <SearchDropdown role="listbox">
              {isLoading ? (
                <LoadingText>Searching...</LoadingText>
              ) : searchResults.length > 0 ? (
                searchResults.map((place, i) => (
                  <DropdownItem
                    key={i}
                    role="option"
                    onClick={() => handleSelectPlace(place)}
                  >
                    {place.name}
                  </DropdownItem>
                ))
              ) : (
                <NoResults>No places found</NoResults>
              )}
            </SearchDropdown>
          )}
        </InputContainer>
        <SearchButton type="button" onClick={() => performSearch(searchTerm)}>
          Search
        </SearchButton>
      </FormContainer>
    </SearchContainer>
  );
}

const SearchContainer = styled.text`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 3.2rem;
    margin: 10rem 0rem 3rem 0rem;
  }
`;

const FormContainer = styled.form`
  width: 680px;
  display: flex;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  position: relative;
  width: 550px;
  height: 48px;
  display: flex;
  padding: 0rem 1.2rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  background: hsl(243, 23%, 20%);
`;
const Input = styled.input`
  width: 95%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  color: hsl(0, 0%, 100%);
  background: hsl(243, 23%, 20%);
  &::placeholder {
    color: hsl(0, 0%, 100%);
    opacity: 1;
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: hsl(243, 23%, 20%);
  border-radius: 8px;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 0.8rem 1.2rem;
  color: white;
  cursor: pointer;

  &:hover {
    background: hsl(243, 23%, 24%);
  }
`;

const NoResults = styled.div`
  padding: 0.8rem 1.2rem;
  color: hsl(0, 0%, 70%);
  text-align: center;
`;

const LoadingText = styled.div`
  padding: 0.8rem 1.2rem;
  color: hsl(0, 0%, 70%);
  text-align: center;
`;
