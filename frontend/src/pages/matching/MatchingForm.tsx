import React, { useState } from 'react';
import { Button, FormControl, FormLabel, HStack, Select, Stack } from '@chakra-ui/react';
import QuestionCategoryAutocomplete from '../../components/questions/QuestionCategoryAutocomplete';
import { QuestionComplexityEnum } from '../../types/questions/questions';
import { FaBoltLightning } from 'react-icons/fa6';

interface MatchingFormProps {
  handleMatchRequest: (complexity: QuestionComplexityEnum, categories: string[]) => void;
}

const MatchingForm: React.FC<MatchingFormProps> = ({ handleMatchRequest }) => {
  const [complexity, setComplexity] = useState(QuestionComplexityEnum.EASY);
  const [categories, setCategories] = useState<string[]>([]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleMatchRequest(complexity, categories);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <HStack mt={2}>
          <FormControl isRequired>
            <FormLabel>Complexity</FormLabel>
            <Select
              value={complexity}
              onChange={(e) => {
                setComplexity(e.target.value as QuestionComplexityEnum);
              }}
            >
              <option value={QuestionComplexityEnum.EASY}>Easy</option>
              <option value={QuestionComplexityEnum.MEDIUM}>Medium</option>
              <option value={QuestionComplexityEnum.HARD}>Hard</option>
            </Select>
          </FormControl>
        </HStack>

        <FormControl isRequired>
          <FormLabel>Categories</FormLabel>
          <QuestionCategoryAutocomplete categories={categories} handleChange={setCategories} />
        </FormControl>
        <Button type="submit" colorScheme="teal" leftIcon={<FaBoltLightning size={20} />}>
          Find a match!
        </Button>
      </Stack>
    </form>
  );
};

export default MatchingForm;
