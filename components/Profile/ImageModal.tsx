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
import IconImage from "../CommonComponents/IconImage";

const ImageModal = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageState, setImageState] = useState<ImageStateType | null>();
  const currentUserstore = useSetRecoilState(currentUserStore);
  const { isMyPage, isAuthChecking, currentUser } = useIsMyPage();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onClick = async () => {
    if (!currentUser || !imageState) {
      onClose();
      return;
    }
    const time = Date.now().toString();
    const fileName: string = currentUser.uid + time + imageState?.file.name;
    try {
      //ローディング中に設定
      setIsLoading(true);
      //画像をアップロード
      await UploadImage(`profileImage`, imageState, fileName);
      //画像のURLを取得
      const photoURL = await getDownloadURL(
        ref(storage, `profileImage/${fileName}`)
      );
      //ユーザーDBを更新
      await setDoc(
        doc(db, `users/${currentUser.uid}`),
        { photoSource: fileName, photoURL },
        { merge: true }
      );
      currentUserstore((prev: any) => ({ ...prev, photoURL }));
      router.push(`/users/${props.uid}`);
      onClose();
    } catch (e) {
      alert("画像のアップロードに失敗しました。もう一度実行してください。");
    }
    //ローディング中でない
    setIsLoading(false);
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
        <IconImage photoURL={props && props.photoURL} size={100} />
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
            <Button
              mx="auto"
              colorScheme="blue"
              onClick={onClick}
              isLoading={isLoading}
            >
              更新
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
