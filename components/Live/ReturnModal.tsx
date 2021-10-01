import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const ReturnModal = () => {
  const router = useRouter();
  const onClose = () => router.push("/");
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as="h2" mx="auto" fontSize="2xl">
          放送が終了しました
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection="column" justifyContent="center">
            <Text mx="auto" fontSize="md">
              まもなくホームに戻ります
            </Text>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              mt={10}
              mx="auto"
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose} _focus={{}}>
            ホームに戻る
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReturnModal;
