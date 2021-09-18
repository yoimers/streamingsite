import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

const MobileSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  return (
    <>
      <IconButton
        color="brand.searchcolor"
        aria-label="Open menubar"
        onClick={onOpen}
        _focus={{}}
        icon={<SearchIcon w={6} h={6} />}
      />
      <Modal
        initialFocusRef={initialRef as any}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent rounded="10px" h="60px" alignContent="center">
          <ModalBody p={2} alignItems="center">
            <InputGroup h="100%" m={0} p={0}>
              <Input
                ref={initialRef as any}
                placeholder="放送を検索！"
                variant="mobilesearchinput"
                h="100%"
                m={0}
              />
              <InputRightElement width="44px" height="44px">
                <SearchIcon
                  color="brand.searchcolor"
                  width="22px"
                  height="22px"
                />
              </InputRightElement>
            </InputGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MobileSearch;
