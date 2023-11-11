import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import { PiChalkboardFill } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import { Canvas, Tldraw, getUserPreferences, setUserPreferences } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import React, { useEffect } from 'react';
import { useYjsStore } from './useYjsStore';
import WhiteboardAwarenessDisplay from './WhiteboardAwareness';

const Whiteboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { roomId } = useParams();

  useEffect(() => {
    setUserPreferences({ ...getUserPreferences(), isDarkMode: colorMode === 'dark' });
  }, [colorMode]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { tlStore: store, awareness } = useYjsStore({
    roomId: 'whiteboard_' + (roomId as string),
    hostUrl: process.env.REACT_APP_COLLABORATION_SERVICE_WEBSOCKET_BACKEND_URL as string,
  });

  return (
    <Flex marginLeft={2} alignItems="center">
      <Button size="sm" variant="outline" onClick={onOpen} leftIcon={<PiChalkboardFill size={20} />}>
        Whiteboard
      </Button>

      <Modal isCentered closeOnOverlayClick={false} size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="83vw" maxWidth="87vw" height="90vh">
          <ModalCloseButton />
          <ModalBody width="80vw" height="83vh" marginTop={8}>
            <Box width="80vw" height="83vh" padding={4}>
              <Tldraw store={store}>
                <Canvas />
                <WhiteboardAwarenessDisplay awareness={awareness} />
              </Tldraw>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Whiteboard;
