import React, { useState, useEffect } from "react";
import "./Home.css";
import styled from "styled-components";
import { StringsList, SearchResult, SearchInput } from "components";
import { AddStringModal } from "components/Views/Modals/AddString";
import Item from "dbo/item";

const Home = () => {
  const [stringList, setStringList] = useState<Item[]>([]);
  const [searchResult, setSearchResult] = useState<Item[]>([]);

  async function updateStringList() {
    const response = await fetch("http://localhost:3001/");
    const items = await response.json();
    setStringList(items);
  }

  async function deleteItem(itemId: string) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const res = await fetch(`http://localhost:3001/${itemId}`, requestOptions);
    const data = await res.json();
    updateStringList();
  }

  useEffect(() => {
    updateStringList();
  }, []);

  return (
    <>
      <MainContainer>
        <SearchInput setSearchResult={setSearchResult}></SearchInput>
        <SearchResult
          stringList={searchResult}
          listTitle="Search results:"
        ></SearchResult>
        <br />
        <br />
        <StringsList
          stringList={stringList}
          listTitle="All strings:"
          deleteItem={deleteItem}
        ></StringsList>
      </MainContainer>
      <AddStringModal updateStringList={updateStringList} />
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Home;
