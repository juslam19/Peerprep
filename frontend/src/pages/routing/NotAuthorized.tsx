import { Heading, Link as ExternalLink, Text, Button, useColorModeValue, Stack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { PEERPREP_GITHUB_ISSUES_LINK } from '../../utils/constants';

const PageNotAuthorized: React.FC = () => {
  return (
    <Stack alignItems="center" marginTop={10}>
      <Heading fontSize={{ base: '7xl', md: '9xl' }} marginBottom={4} color="gray.500">
        {'< 403 />'}
      </Heading>
      <Heading fontSize="4xl">{'Uh oh. We found the page, but...'}</Heading>
      <Text fontSize="xl" color={useColorModeValue('gray.500', 'gray.300')}>
        {'You are not authorised to access it!'}
      </Text>

      <Stack direction="row" marginTop={4} spacing={6}>
        <Button
          colorScheme="teal"
          variant="outline"
          as={ExternalLink}
          isExternal
          href={`${PEERPREP_GITHUB_ISSUES_LINK}/new`}
        >
          Report an issue
        </Button>
        <Link to="/">
          <Button colorScheme="teal">Bring me back home</Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default PageNotAuthorized;
