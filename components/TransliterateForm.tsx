import { TextInput, Button, Group, Checkbox, Select, LoadingOverlay, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { DEFAULT_SETTINGS, MAX_LETTERS } from '../constants/transliterate.constants';
import { TransliterateSettings } from '../types/transliterate.types';
import { delay } from '../utils/delay';

type Props = {
  onSuccess: (payload: { minLetters: number; maxLetters: number }) => unknown;
  initialValues?: TransliterateSettings;
};

export const TransliterateForm: React.FC<Props> = ({
  onSuccess,
  initialValues = DEFAULT_SETTINGS,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: initialValues,
    validate: {
      maxLetters: (value, values) => {
        const numValue = Number(value);
        const numMinLettersValue = Number(values.minLetters);

        if (numValue < numMinLettersValue) {
          return 'Максимальное число не должно быть меньше минимального';
        }

        if (numValue > MAX_LETTERS) {
          return `Максмальное число "${MAX_LETTERS}"`;
        }

        return null;
      },
      minLetters: (value, values) => {
        const numValue = Number(value);
        const numMaxLettersValue = Number(values.maxLetters);

        if (numValue > numMaxLettersValue) {
          return 'Минимальное число не должно быть меньше максимального';
        }

        if (numValue > MAX_LETTERS) {
          return `Максмальное число "${MAX_LETTERS}"`;
        }

        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    await delay(500);
    setLoading(false);

    return onSuccess({
      ...values,
      maxLetters: Number(values.maxLetters),
      minLetters: Number(values.minLetters),
    });
  };

  return (
    <Paper shadow="md" radius="md" mb="md" p="md" withBorder style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          type="number"
          label="Минимальное число символов"
          {...form.getInputProps('minLetters')}
        />
        <TextInput
          mt={'xs'}
          required
          type="number"
          label="Максимальное число символов"
          {...form.getInputProps('maxLetters')}
        />

        <Checkbox
          mt={'md'}
          mb="sm"
          required
          label="Разрешить одинаковые буквы рядом"
          {...form.getInputProps('allowDoubles', {
            type: 'checkbox',
          })}
        />

        <Select
          required
          label="Разделитель букв"
          data={[
            {
              value: '_',
              label: 'Нижнее подчеркивание',
            },
            {
              value: '-',
              label: 'Дефис',
            },
            {
              value: ' ',
              label: 'Пробел',
            },
            {
              value: '/',
            },
            {
              value: '',
              label: 'Без разделителя',
            },
          ]}
          {...form.getInputProps('divider')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Дальше</Button>
        </Group>
      </form>
    </Paper>
  );
};
