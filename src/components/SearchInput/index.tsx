import React, { useEffect, Dispatch, SetStateAction } from "react";
import { Input } from "components";
import Item  from 'dbo/item'

interface Props {
  setSearchResult: Dispatch<SetStateAction<Item[]>>;
}

const SearchInput = ({ setSearchResult }: Props) => {
  function fetchSearchResult(keyword: string) {
    if (!keyword) {
      setSearchResult([]);
      return;
    }

    fetch(`http://localhost:3001/search/${keyword}`)
      .then((res) => res.json())
      .then((items) => {
        setSearchResult(items);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }

  function handleChange(event: any) {
    fetchSearchResult(event.target.value);
  }

  useEffect(() => {}, []);

  return <Input type="text" name="name" onChange={handleChange} />;
};

export default SearchInput;
