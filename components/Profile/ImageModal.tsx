import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import Image from "next/image";
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
import ProfileDragandDrop from "./ProfileDragandDrop";
import styles from "../Layout.module.css";
import { ImageStateType } from "../../pages/broadcast";
import { UploadImage } from "../../src/lib/UploadImage";
import { useIsMyPage } from "../../hooks/useIsMyPage";
import { doc } from "@firebase/firestore";
import { db, storage } from "../../src/lib/firebase";
import { setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { currentUserStore } from "../../states/currentUserStore";
import { useSetRecoilState } from "recoil";
import { getDownloadURL } from "@firebase/storage";
import { ref } from "firebase/storage";
import { PersonalVideo } from "@material-ui/icons";

const ImageModal = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageState, setImageState] = useState<ImageStateType | null>();
  const currentUserstore = useSetRecoilState(currentUserStore);
  const { isMyPage, isAuthChecking, currentUser } = useIsMyPage();
  const router = useRouter();
  const onClick = async () => {
    if (!currentUser || !imageState) {
      onClose();
      return;
    }
    const time = Date.now().toString();
    const fileName: string = currentUser.uid + time + imageState?.file.name;
    //画像をアップロード
    await UploadImage(`profileImage`, imageState, fileName);
    //ユーザーDBを更新
    await setDoc(
      doc(db, `users/${currentUser.uid}`),
      { photoSource: fileName },
      { merge: true }
    );
    const url = await getDownloadURL(ref(storage, `profileImage/${fileName}`));
    currentUserstore((prev: any) => ({ ...prev, photoURL: url }));
    router.push(`/users/${props.uid}`);
    onClose();
  };
  return (
    <>
      <Box
        as="button"
        height="100px"
        width="100px"
        position="relative"
        rounded="full"
        onClick={isMyPage ? onOpen : () => {}}
        _active={{}}
        _focus={{}}
      >
        {props.photoURL && (
          <Image
            src={props.photoURL}
            layout="fill"
            objectFit="cover"
            alt="プロフィール画像"
            className={styles.image}
          />
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ユーザー画像の変更</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileDragandDrop setImageState={setImageState} />
          </ModalBody>

          <ModalFooter>
            <Button mx="auto" colorScheme="blue" onClick={onClick}>
              更新
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
