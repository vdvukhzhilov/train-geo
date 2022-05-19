import {
  Grid,
  Button,
  Paper,
  Group,
  Text,
  Container,
  Skeleton,
  useMantineTheme,
  Stack,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { delay } from '../utils/delay';
import { getRandomArrayElements } from '../utils/getRandomArrayElements';
import { WordToLearn } from '../types/words.types';

type Props = {
  words: WordToLearn[];
};

function useTransliterateExercise(words: WordToLearn[]) {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [currentWordInGe, setCurrentWordInGe] = useState<string>();

  const triggerLoading = async (timeout?: number) => {
    setLoading(true);
    await delay(timeout);
    setLoading(false);
  };

  const handleGenerate = async () => {
    const word = getRandomArrayElements(words, 1)['0'].ru;

    setCurrentWord('');
    setCurrentWordInGe('');
    await triggerLoading();
    setCurrentWord(word);
  };

  const handleShowInGe = async () => {
    const wordInGe = words.find(({ ru }) => ru === currentWord)?.ge;
    await triggerLoading();
    setCurrentWordInGe(wordInGe);
  };

  const availableToGenerate = !currentWord || !!currentWordInGe;

  const currentWordLoading = loading && !currentWord;
  const currentWordInGeLoading = loading && !!currentWord && !currentWordInGe;

  const showCurrentWordPlaceholder = !currentWordLoading && !currentWord;
  const currentWordInGePlaceholder = !currentWordInGeLoading && !currentWordInGe;

  return {
    handleGenerate,
    handleShowInGe,
    currentWordInGe: currentWordInGe,
    currentWord: currentWord,
    availableToGenerate,
    currentWordLoading,
    currentWordInGeLoading,
    showCurrentWordPlaceholder,
    currentWordInGePlaceholder,
  };
}

type ButtonsProps = {
  loading: boolean;
  isLessThanMd: boolean;
  availableToGenerate: boolean;
  handleGenerate: any;
  handleShowInGe: any;
};

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { availableToGenerate, handleGenerate, handleShowInGe, isLessThanMd, loading } = props;

  const actionButton = availableToGenerate ? (
    <Button loading={loading} onClick={handleGenerate}>
      Получить слово
    </Button>
  ) : (
    <Button loading={loading} onClick={handleShowInGe}>
      Показать ответ
    </Button>
  );

  return <Group mb={isLessThanMd ? 'md' : undefined}>{actionButton}</Group>;
};

export const WordsExercise: React.FC<Props> = (props) => {
  const { words } = props;
  const {
    currentWord,
    currentWordInGe,
    handleGenerate,
    handleShowInGe,
    availableToGenerate,
    currentWordLoading,
    currentWordInGeLoading,
    currentWordInGePlaceholder,
    showCurrentWordPlaceholder,
  } = useTransliterateExercise(words);
  const { breakpoints } = useMantineTheme();
  const isLessThanMd = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  if (isLessThanMd) {
    return (
      <Stack>
        <Buttons
          availableToGenerate={availableToGenerate}
          handleGenerate={handleGenerate}
          handleShowInGe={handleShowInGe}
          isLessThanMd={isLessThanMd}
          loading={currentWordLoading || currentWordInGeLoading}
        />
        <Paper shadow="md" radius="md" p="md" withBorder>
          {currentWord && <Text size={isLessThanMd ? 'md' : 'xl'}>{currentWord}</Text>}
          {currentWordLoading && (
            <Skeleton width={'70%'} height={isLessThanMd ? 24 : 31} radius="md" />
          )}
          {showCurrentWordPlaceholder && (
            <Text
              key={'placeholder'}
              size={isLessThanMd ? 'sm' : 'lg'}
              sx={{ height: isLessThanMd ? undefined : 31 }}
              color="dimmed"
            >
              Нажмите кнопку "Показать слово"
            </Text>
          )}
        </Paper>
        <Paper shadow="md" radius="md" p="md" withBorder>
          {currentWordInGe && <Text size={isLessThanMd ? 'md' : 'xl'}>{currentWordInGe}</Text>}
          {currentWordInGeLoading && (
            <Skeleton width={'70%'} height={isLessThanMd ? 24 : 31} radius="md" />
          )}
          {currentWordInGePlaceholder && (
            <Text
              key={'placeholder2'}
              size={isLessThanMd ? 'sm' : 'lg'}
              sx={{ height: isLessThanMd ? undefined : 31 }}
              color="dimmed"
            >
              Тут будет показан ответ
            </Text>
          )}
        </Paper>
      </Stack>
    );
  }
  return (
    <Container fluid>
      <Grid grow>
        <Grid.Col span={12}>
          <Buttons
            availableToGenerate={availableToGenerate}
            handleGenerate={handleGenerate}
            handleShowInGe={handleShowInGe}
            isLessThanMd={isLessThanMd}
            loading={currentWordLoading || currentWordInGeLoading}
          />
        </Grid.Col>
        <Grid.Col mt={isLessThanMd ? 'xs' : 'md'} span={isLessThanMd ? 12 : 6}>
          <Paper shadow="md" radius="md" mb="md" p="md" withBorder>
            {currentWord && <Text size={isLessThanMd ? 'md' : 'xl'}>{currentWord}</Text>}
            {currentWordLoading && (
              <Skeleton width={'70%'} height={isLessThanMd ? 24 : 31} radius="md" />
            )}
            {showCurrentWordPlaceholder && (
              <Text
                key={'placeholder'}
                size={isLessThanMd ? 'sm' : 'lg'}
                sx={{ height: isLessThanMd ? undefined : 31 }}
                color="dimmed"
              >
                Нажмите кнопку "Показать слово"
              </Text>
            )}
          </Paper>
        </Grid.Col>
        <Grid.Col mt={isLessThanMd ? 'xs' : 'md'} span={isLessThanMd ? 12 : 6}>
          <Paper shadow="md" radius="md" mb="md" p="md" withBorder>
            {currentWordInGe && <Text size={isLessThanMd ? 'md' : 'xl'}>{currentWordInGe}</Text>}
            {currentWordInGeLoading && (
              <Skeleton width={'70%'} height={isLessThanMd ? 24 : 31} radius="md" />
            )}
            {currentWordInGePlaceholder && (
              <Text
                key={'placeholder2'}
                size={isLessThanMd ? 'sm' : 'lg'}
                sx={{ height: isLessThanMd ? undefined : 31 }}
                color="dimmed"
              >
                Тут будет показан правильный ответ
              </Text>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
