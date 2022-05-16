import {
  Grid,
  Button,
  Paper,
  Group,
  Text,
  Container,
  Skeleton,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { RU_LETTERS, RU_TO_GE } from '../constants/alphabet';
import { TransliterateSettings } from '../types/transliterate.types';
import { delay } from '../utils/delay';
import { getLetterTransliteration } from '../utils/getLetterTransliteration';
import { getRandomArbitrary } from '../utils/getRandomArbitrary';
import { getRandomArrayElements } from '../utils/getRandomArrayElements';

type Props = {
  settings: TransliterateSettings;
  onChangeSettings: () => void;
};

function useTransliterateExercise(settings: TransliterateSettings) {
  const { maxLetters, minLetters, allowDoubles, divider } = settings;
  const [currentWord, setCurrentWord] = useState<typeof RU_LETTERS>([]);
  const [loading, setLoading] = useState(false);
  const [currentWordInGe, setCurrentWordInGe] = useState<typeof RU_TO_GE[keyof typeof RU_TO_GE][]>(
    []
  );

  const triggerLoading = async (timeout?: number) => {
    setLoading(true);
    await delay(timeout);
    setLoading(false);
  };

  const handleGenerate = async () => {
    const randomLength = getRandomArbitrary(minLetters, maxLetters);
    const word = getRandomArrayElements(RU_LETTERS, randomLength, allowDoubles);

    setCurrentWord([]);
    setCurrentWordInGe([]);
    await triggerLoading();
    setCurrentWord(word);
  };

  const handleShowInGe = async () => {
    const wordInGe = currentWord.map((letter) => getLetterTransliteration(RU_TO_GE, letter));
    await triggerLoading();
    setCurrentWordInGe(wordInGe);
  };

  const availableToGenerate = !currentWord.length || !!currentWordInGe.length;

  const currentWordLoading = loading && !currentWord.length;
  const currentWordInGeLoading = loading && !!currentWord.length && !currentWordInGe.length;

  const showCurrentWordPlaceholder = !currentWordLoading && !currentWord.length;
  const currentWordInGePlaceholder = !currentWordInGeLoading && !currentWordInGe.length;

  return {
    handleGenerate,
    handleShowInGe,
    currentWordInGe: currentWordInGe.join(divider),
    currentWord: currentWord.join(divider),
    availableToGenerate,
    currentWordLoading,
    currentWordInGeLoading,
    showCurrentWordPlaceholder,
    currentWordInGePlaceholder,
  };
}

export const TransliterateExercise: React.FC<Props> = (props) => {
  const { onChangeSettings, settings } = props;
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
  } = useTransliterateExercise(settings);
  const { breakpoints } = useMantineTheme();
  const isLessThanMd = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  return (
    <Container fluid>
      <Grid grow>
        <Grid.Col span={12}>
          <Group>
            {availableToGenerate ? (
              <Button
                loading={currentWordLoading || currentWordInGeLoading}
                onClick={handleGenerate}
              >
                Сгенерировать набор букв
              </Button>
            ) : (
              <Button
                loading={currentWordLoading || currentWordInGeLoading}
                onClick={handleShowInGe}
              >
                Показать набор букв на грузинском
              </Button>
            )}
            <Button ml="auto" onClick={onChangeSettings} variant="subtle">
              Изменить настройки
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col mt={isLessThanMd ? 'xs' : 'md'} span={isLessThanMd ? 12 : 6}>
          <Paper shadow="md" radius="md" mb="md" p="md" withBorder>
            {currentWord && <Text size={'xl'}>{currentWord}</Text>}
            {currentWordLoading && <Skeleton width={'70%'} height={31} radius="md" />}
            {showCurrentWordPlaceholder && (
              <Text size={'lg'} sx={{ height: 31 }} color="dimmed">
                Нажмите кнопку "Сгенерировать набор букв"
              </Text>
            )}
          </Paper>
        </Grid.Col>
        <Grid.Col mt={isLessThanMd ? 'xs' : 'md'} span={isLessThanMd ? 12 : 6}>
          <Paper shadow="md" radius="md" mb="md" p="md" withBorder>
            {currentWordInGe && <Text size={'xl'}>{currentWordInGe}</Text>}
            {currentWordInGeLoading && <Skeleton width={'70%'} height={31} radius="md" />}
            {currentWordInGePlaceholder && (
              <Text size={'lg'} sx={{ height: 31 }} color="dimmed">
                Тут будет показано правильное написание
              </Text>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
