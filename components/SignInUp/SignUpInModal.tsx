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
  Box,
  Button,
} from "@chakra-ui/react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { FaUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import {
  BroadcastButton,
  SingInButton,
  SignUpButton,
} from "../Header/HeaderButton";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { signInWithGoogle, signOutWithGoogle } from "../../src/lib/firebase";
import Link from "next/link";
import Image from "next/image";

import { SignInOutTriger } from "../../src/lib/SignInOutTriger";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../states/currentUser";
import { Profilemenu } from "../Profile/Profilemenu";

const SignUpInModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const tabcolor = useColorModeValue("brand.maincolor", "blue.300");
  const bg = useColorModeValue("#F7F9FF", "gray.700");
  const profileiconcolor = useColorModeValue("#383838", "#E6EDFF");
  const currentUser = useRecoilValue(currentUserState);

  const onClick = (issignup: boolean) => {
    onOpen();
    setIsSignUp(issignup);
  };

  return (
    <>
      <SignInOutTriger
        SignIn={
          <>
            <Link href="/broadcast" passHref>
              <a>
                <Button variant="mainbutton" size="xl">
                  放送する
                </Button>
              </a>
            </Link>

            <Profilemenu>
              {currentUser && currentUser.photoURL ? (
                <Image
                  src={currentUser.photoURL}
                  layout="fill"
                  alt="Picture of the author"
                />
              ) : (
                <FaUserCircle size={40} color={profileiconcolor} />
              )}
            </Profilemenu>
          </>
        }
        SignOut={
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
        }
        Loading={
          <>
            <SingInButton isLoading={true} />
            <SingInButton isLoading={true} />
          </>
        }
      />

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
