import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { onSnapshot, doc } from "@firebase/firestore";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect } from "react";
import { db } from "../src/lib/firebase";

const useIsBroadCast = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  // if (!isNow) router.push("/");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, `broads/${router.query.live}`), (doc) => {
      if (!doc.data()?.isNow) {
        console.log(doc.data());
        onOpen();
        setTimeout(() => router.push("/"), 2000);
      }
    });
    return unsub;
  }, [onOpen, router, router.query.live]);
  const isNow = !isOpen;
  return { isNow };
};

export default useIsBroadCast;
