import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/input";
import { route } from "next/dist/server/router";
import router from "next/router";
import React, { useState } from "react";
import { index } from "../../src/algolia/algolia";

export const Search = () => {
  const [value, setValue] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search?search=${value}`);
  };
  return (
    <InputGroup
      as="form"
      w="100%"
      maxWidth="240px"
      justifyItems="center"
      mr={4}
      onSubmit={onSubmit}
    >
      <Input
        placeholder="放送を検索！"
        variant="searchinput"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <InputRightElement width="40px" height="40px" mr={1}>
        <SearchIcon
          color="brand.searchcolor"
          width="20px"
          height="20px"
          onClick={onSubmit}
        />
      </InputRightElement>
    </InputGroup>
  );
};
