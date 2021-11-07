import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex, Spacer } from "@chakra-ui/layout";
import {
  Box,
  Button,
  ButtonGroup,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { CgMediaPodcast } from "react-icons/cg";
import { FaQuestionCircle } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { audioList } from "../../states/audioList";
import { broadCastMedia } from "../../states/broadCastMedia";
import { selectedAudioId } from "../../states/selectedAudio";
import MySpinner from "../CommonComponents/MySpinner";
import { DiscriptionOBS } from "./DiscriptionOBS";
import { FinishedButton } from "./FinishedButton";
import { LiveInfomationType } from "./LiveType";

const LiveFooter = (props: LiveInfomationType) => {
  const { currentUser, isAuthChecking } = useCurrentUser();
  const MediaState = useRecoilValue(broadCastMedia);
  const AudioList = useRecoilValue(audioList);
  const SetSelectedAudioId = useSetRecoilState(selectedAudioId);
  const bg = useColorModeValue("white", "gray.600");
  const videofixed = useBreakpointValue({ lg: "flex-start", xl: "center" });

  if (currentUser?.uid !== props.uid) return <></>; //放送者以外には何も表示しない
  if (isAuthChecking) return <MySpinner />; //Loading中
  return (
    <Flex
      justifyContent={videofixed}
      bg={bg}
      rounded={10}
      p={2}
      mt={8}
      w="100%"
      flexDirection="column"
    >
      <Flex>
        <ButtonGroup size="md" isAttached colorScheme="blue">
          <Button
            borderRight="2px"
            borderColor="blue.300"
            _focus={{}}
            _active={{}}
            onClick={MediaState}
            leftIcon={<CgMediaPodcast size="24px" />}
          >
            反映する
          </Button>
          <DiscriptionOBS />
        </ButtonGroup>
        <Spacer />
        <FinishedButton />
      </Flex>
      <Flex mt={2}>
        <Select
          placeholder="音源を選んでください"
          w="300px"
          onChange={(e) => SetSelectedAudioId(e.target.value)}
        >
          {AudioList.map((device) => (
            <option value={device.deviceId} key={device.deviceId}>
              {device.label}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

export default LiveFooter;
