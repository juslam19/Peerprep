import { useLocation, useParams } from 'react-router-dom';
import React from 'react';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';
import { Allotment } from 'allotment';
import CodeEditor from '../../components/code/CodeEditor';

const CollaborationRoom: React.FC = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const editorTheme = useColorModeValue('light', 'vs-dark');

  return (
    <>
      <h1>{`location.state: ${location.state}`}</h1>
      <h1>{roomId}</h1>
      <Box width="100%" height="85vh" my={5}>
        <Allotment>
          <Allotment.Pane>
            <VStack as="div" style={{ overflowY: 'auto', height: '100%', padding: '16px' }}>
              <h1>test</h1>
            </VStack>
          </Allotment.Pane>
          <Allotment.Pane>
            <Box as="div" style={{ maxHeight: '85vh' }}>
              <CodeEditor enableRealTimeEditing defaultTheme={editorTheme} defaultDownloadedFileName="PeerPrep" />
            </Box>
          </Allotment.Pane>
        </Allotment>
      </Box>
    </>
  );
};

export default CollaborationRoom;
