import React from "react";
import styled from "styled-components";
import { TYPE } from "theme";
import Item from "dbo/item";
import { ReactComponent as CrossIcon } from "assets/svg/cross.svg";

interface StringListProps {
  listTitle: string,
  stringList: Item[],
  deleteItem: (itemId: string) => void,
}

interface SearchResultProps {
  listTitle: string,
  stringList: Item[],
}

export const StringsList: React.FC<StringListProps> = ({
  stringList,
  listTitle,
  deleteItem,
}) => {
  function showItems(list: Item[]) {
    if (list.length === 0) {
      return "Nothing found, please enter another keyword";
    } else {
      return list.map((item: Item) => (
        <ListItem key={item._id}>
          {item.text}{" "}
          <StyledCrossIcon
            onClick={() => {
              deleteItem(item._id);
            }}
          />
        </ListItem>
      ));
    }
  }

  return (
    <MainContainer>
      <TYPE.H4>{listTitle}</TYPE.H4>
      <ListContainer>{showItems(stringList)}</ListContainer>
    </MainContainer>
  );
};

export const SearchResult: React.FC<SearchResultProps> = ({
  stringList,
  listTitle,
}) => {
  function showSearchResults(list: Item[]) {
    if (list.length === 0) {
      return "Nothing found, please enter another keyword";
    } else {
      return list.map((item: Item) => (
        <SearchResultListItem key={item._id}> {item.text} </SearchResultListItem>
      ));
    }
  }

  return (
    <MainContainer>
      <TYPE.H4>{listTitle}</TYPE.H4>
      <ListContainer>{showSearchResults(stringList)}</ListContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  text-align: left;
  width: 80%;
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  margin: 1em 0;
  padding: 1em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchResultListItem = styled(ListItem)`
  border-color: #aae3aa;
  background-color: #f3fff3;
`;

const StyledCrossIcon = styled(CrossIcon)`
  &:hover {
    path {
      fill: #e95555;
    }
  }
`;
