import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { doc, setDoc } from "@firebase/firestore";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { db } from "../../src/lib/firebase";

export const FinishedButton = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onFinished = useCallback(async () => {
    await setDoc(
      doc(db, `broads/${router.query.live}`),
      {
        isNow: false,
      },
      { merge: true }
    );
  }, [router.query.live]);
  return (
    <>
      <Button colorScheme="red" variant="solid" _focus={{}} onClick={onOpen}>
        放送終了
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mx="auto">放送を終了しますか？</ModalHeader>

          <ModalFooter justifyContent="center">
            <Button
              colorScheme="red"
              mr={3}
              onClick={onFinished}
              _focus={{}}
              _active={{}}
            >
              放送終了
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
