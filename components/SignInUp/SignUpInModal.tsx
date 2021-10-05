import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Tabs,
  useColorModeValue,
  ModalFooter,
  Divider,
  HStack,
  Button,
} from "@chakra-ui/react";
import { GoogleLoginButton } from "react-social-login-buttons";
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { signInWithGoogle } from "../../src/lib/firebase";
import Link from "next/link";
import { SignInOutTriger } from "../../src/lib/SignInOutTriger";
import { useRecoilValue } from "recoil";
import { Profilemenu } from "../Profile/Profilemenu";
import { currentUserStore } from "../../states/currentUserStore";
import IconImage from "../CommonComponents/IconImage";
type Input = {
  isMd: boolean;
  isHeader?: boolean;
};
const SignUpInModal = ({ isMd, isHeader = true }: Input) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const tabcolor = useColorModeValue("brand.maincolor", "blue.300");
  const bg = useColorModeValue("#F7F9FF", "gray.700");
  const currentUserstore = useRecoilValue(currentUserStore);
  const onClick = (issignup: boolean) => {
    onOpen();
    setIsSignUp(issignup);
  };
  return (
    <>
      {isHeader ? (
        <SignInOutTriger
          SignIn={
            <>
              {isMd && (
                <Link href="/broadcast" passHref>
                  <a>
                    <Button variant="mainbutton" size="xl">
                      放送する
                    </Button>
                  </a>
                </Link>
              )}
              <Profilemenu>
                <IconImage
                  photoURL={currentUserstore && currentUserstore.photoURL}
                  size={40}
                />
              </Profilemenu>
            </>
          }
          SignOut={
            <>
              {isMd && (
                <>
                  <Button
                    variant="subbutton"
                    size="xl"
                    onClick={() => onClick(false)}
                  >
                    ログイン
                  </Button>
                  <Button
                    variant="mainbutton"
                    size="xl"
                    onClick={() => onClick(true)}
                  >
                    新規登録
                  </Button>
                </>
              )}
            </>
          }
          Loading={
            <>
              <Button variant="subbutton" isLoading={true} />
            </>
          }
        />
      ) : (
        <SignInOutTriger
          SignIn={
            <>
              {isMd && (
                <>
                  <Link href="/broadcast" passHref>
                    <a>
                      <Button variant="mainbutton" size="xl" mr={4}>
                        放送する
                      </Button>
                    </a>
                  </Link>
                </>
              )}
            </>
          }
          SignOut={
            <>
              {isMd && (
                <>
                  <Button
                    variant="mainbutton"
                    size="xl"
                    onClick={() => onClick(false)}
                    mb={1}
                  >
                    ログイン
                  </Button>
                </>
              )}
            </>
          }
          Loading={
            <>
              <Button variant="subbutton" isLoading={true} />
            </>
          }
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background={bg} mx={4}>
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
                  <SignIn onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  {/* 新規登録 */}
                  <SignUp onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <Divider opacity={0.4} borderColor="brand.maincolor" />
          <ModalFooter justifyContent="center">
            <HStack>
              <GoogleLoginButton
                style={{ background: bg, color: tabcolor }}
                activeStyle={{ background: bg, color: tabcolor }}
                onClick={signInWithGoogle}
              />
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpInModal;
