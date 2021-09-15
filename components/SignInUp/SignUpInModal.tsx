import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { BrandingWatermark } from "@material-ui/icons";
import React, { useState } from "react";
import { SingInButton, SingUpButton } from "../Header/HeaderButton";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const SignUpInModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const tabcolor = useColorModeValue("brand.maincolor", "blue.300");
  const bg = useColorModeValue("#F7F9FF", "gray.700");
  const onClick = (issignup: boolean) => {
    onOpen();
    setIsSignUp(issignup);
  };
  return (
    <>
      <SingInButton onClick={() => onClick(false)}>ログイン</SingInButton>
      <SingUpButton onClick={() => onClick(true)}>新規登録</SingUpButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background={bg}>
          <ModalCloseButton _active={{}} _focus={{}} />
          <ModalBody>
            <Tabs
              defaultIndex={isSignUp ? 1 : 0}
              onChange={(index) => setIsSignUp(index === 0 ? false : true)}
            >
              <TabList>
                <Tab
                  _active={{}}
                  _focus={{}}
                  _selected={{
                    color: tabcolor,
                    borderBottomColor: tabcolor,
                  }}
                  color={isSignUp ? "brand.mygray1" : "tabcolor"}
                  fontSize={24}
                  fontWeight="semibold"
                  letterSpacing="0.16px"
                >
                  ログイン
                </Tab>
                <Tab
                  _active={{}}
                  _focus={{}}
                  _selected={{
                    color: tabcolor,
                    borderBottomColor: tabcolor,
                  }}
                  color={!isSignUp ? "brand.mygray1" : "tabcolor"}
                  fontSize={24}
                  fontWeight="semibold"
                  letterSpacing="0.16px"
                >
                  新規登録
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* ログイン */}
                  <SignIn />
                </TabPanel>
                <TabPanel>
                  {/* 新規登録 */}
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpInModal;
