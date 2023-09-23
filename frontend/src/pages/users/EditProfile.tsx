import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { EditorLanguageEnum } from '../../types/code/languages';
import type { Language } from '../../types/users/users';

interface EditProfileProps {
  isOpen: boolean;
  onCloseModal: () => void;
  initialUsername: string;
  initialEmail: string;
  initialLanguages: Language[];
}

const EditProfile: React.FC<EditProfileProps> = ({
  isOpen,
  onCloseModal,
  initialUsername,
  initialEmail,
  initialLanguages,
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const allLanguages = Object.values(EditorLanguageEnum);

  // Prefill form with initial data whenever form is opened.
  useEffect(() => {
    // Check if data is being fetched correctly.
    console.log('initialUsername:', initialUsername);
    console.log('initialEmail:', initialEmail);
    console.log('initialLanguages:', initialLanguages);

    if (isOpen) {
      setUsername(initialUsername);
      setEmail(initialEmail);
      setLanguages(initialLanguages);
    }
  }, [isOpen, initialUsername, initialEmail, initialLanguages]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <form onSubmit={handleSubmit}> */}
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Languages</FormLabel>
              <AutoComplete
                openOnFocus
                closeOnSelect
                multiple
                onChange={(selectedLanguages) => {
                  setLanguages(selectedLanguages as Language[]);
                }}
                isLoading={allLanguages.length === 0}
                suggestWhenEmpty
                restoreOnBlurIfEmpty={false}
                value={languages}
              >
                <AutoCompleteInput variant="filled">
                  {({ tags }) =>
                    tags.map((tag, tid) => (
                      <AutoCompleteTag key={tid} label={tag.label as string} onRemove={tag.onRemove} />
                    ))
                  }
                </AutoCompleteInput>
                <AutoCompleteList>
                  {allLanguages.map((language, lid) => (
                    <AutoCompleteItem
                      key={`option-${lid}`}
                      value={language}
                      style={{ marginTop: 4, marginBottom: 4 }}
                      _selected={{ bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'), color: 'gray.500' }}
                      _focus={{ bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100') }}
                    >
                      {language}
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
            </FormControl>
          </Stack>
          {/* </form> */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={4}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
