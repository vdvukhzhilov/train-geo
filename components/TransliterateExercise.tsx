import {
  Grid,
  Button,
  Paper,
  Group,
  Text,
  Container,
  Skeleton,
  useMantineTheme,
  ActionIcon,
  Stack,
  TextInput,
} from '@mantine/core';
import { Settings } from 'tabler-icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { FormEvent, useEffect, useState } from 'react';
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
  const wordInGe = currentWord.map((letter) => getLetterTransliteration(RU_TO_GE, letter));
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<boolean>(false);

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
    setSuccess(false);
    setError(null);
    setInputValue('');
    await triggerLoading();
    setCurrentWord(word);
  };

  const handleShowInGe = async (shouldNotWait?: boolean) => {
    !shouldNotWait && (await triggerLoading());
    setCurrentWordInGe(wordInGe);
  };

  const availableToGenerate = !currentWord.length || !!currentWordInGe.length;

  const currentWordLoading = loading && !currentWord.length;
  const currentWordInGeLoading = loading && !!currentWord.length && !currentWordInGe.length;

  const showCurrentWordPlaceholder = !currentWordLoading && !currentWord.length;
  const currentWordInGePlaceholder = !currentWordInGeLoading && !currentWordInGe.length;

  const validation = (value: string) => {
    if (!value) {
      return 'Значение не должно быть пустым';
    }

    const innerDivider = divider ? (value.indexOf(divider) !== -1 && divider) || '' : '';

    const letters = value.trim().split(innerDivider).filter(Boolean);

    console.log(`value`, value);
    console.log(`letters`, letters);
    console.log(`wordInGe`, wordInGe);

    if (
      letters
        .map((l) => l)
        .sort()
        .join('') !==
      wordInGe
        .map((l) => l)
        .sort()
        .join('')
    ) {
      return 'Значения не совпадают';
    }

    return null;
  };

  console.log(`ge`, wordInGe);

  const handleCheck = async () => {
    await triggerLoading();
    const error = validation(inputValue);
    if (error) {
      setError(error);
    } else {
      setSuccess(true);
      handleShowInGe();
    }
  };

  const inputProps = {
    value: inputValue,
    onChange: (event: FormEvent<HTMLInputElement>) => {
      setInputValue((event.target as HTMLInputElement).value);
    },
    error,
  };

  useEffect(() => {
    setError(null);
  }, [inputValue]);

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
    inputProps,
    handleCheck,
    success,
  };
}

type ButtonsProps = {
  loading: boolean;
  isLessThanMd: boolean;
  availableToGenerate: boolean;
  handleGenerate: any;
  handleShowInGe: any;
  onChangeSettings: any;
};

const Buttons: React.FC<ButtonsProps> = (props) => {
  const {
    availableToGenerate,
    handleGenerate,
    handleShowInGe,
    isLessThanMd,
    loading,
    onChangeSettings,
  } = props;

  const actionButton = availableToGenerate ? (
    <Button loading={loading} onClick={handleGenerate}>
      {isLessThanMd ? 'Сгенерировать' : 'Сгенерировать набор букв'}
    </Button>
  ) : (
    <Button loading={loading} onClick={handleShowInGe}>
      {isLessThanMd ? 'Показать ответ' : 'Показать набор букв на грузинском'}
    </Button>
  );

  const settingButton = isLessThanMd ? (
    <ActionIcon variant="outline" ml="auto" onClick={onChangeSettings}>
      <Settings />
    </ActionIcon>
  ) : (
    <Button ml="auto" onClick={onChangeSettings} variant="subtle">
      Изменить настройки
    </Button>
  );

  return (
    <Group mb={isLessThanMd ? 'md' : undefined}>
      {actionButton}
      {settingButton}
    </Group>
  );
};

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
    inputProps,
    handleCheck,
    success,
  } = useTransliterateExercise(settings);
  const { breakpoints } = useMantineTheme();
  const isLessThanMd = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  const input = (
    <Group direction="column">
      <TextInput
        disabled={currentWordLoading || !currentWord || currentWordInGeLoading}
        label="Введите свой ответ"
        sx={{ width: '100%' }}
        {...inputProps}
      />
      {success && <Text color={'green'}>Правильно!</Text>}
      {!success && (
        <Button
          disabled={currentWordLoading || !currentWord}
          onClick={handleCheck}
          fullWidth={false}
          loading={(!!currentWord && currentWordLoading) || currentWordInGeLoading}
          type={'submit'}
        >
          Проверить
        </Button>
      )}
    </Group>
  );

  if (isLessThanMd) {
    return (
      <Stack>
        <Buttons
          availableToGenerate={availableToGenerate}
          handleGenerate={handleGenerate}
          handleShowInGe={handleShowInGe}
          isLessThanMd={isLessThanMd}
          onChangeSettings={onChangeSettings}
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
              Нажмите кнопку "Сгенерировать набор букв"
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
              Тут будет показано правильное написание
            </Text>
          )}
        </Paper>
        <Paper shadow="md" radius="md" p="md" withBorder>
          {input}
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
            onChangeSettings={onChangeSettings}
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
                Нажмите кнопку "Сгенерировать набор букв"
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
                Тут будет показано правильное написание
              </Text>
            )}
          </Paper>
        </Grid.Col>
        <Grid.Col span={12}>
          <Paper shadow="md" radius="md" mb="md" p="md" withBorder>
            {input}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
