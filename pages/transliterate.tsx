import { Container, Divider, Group, Space, Title } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, Fragment } from 'react';
import { PageTitle } from '../components/PageTitle';
import { TransliterateExercise } from '../components/TransliterateExercise';
import { TransliterateForm } from '../components/TransliterateForm';
import { DEFAULT_SETTINGS } from '../constants/transliterate.constants';
import { TransliterateSettings } from '../types/transliterate.types';

const Home: NextPage = () => {
  const [transliterateContext, setTransliterateContext] =
    useState<TransliterateSettings>(DEFAULT_SETTINGS);
  const [formShowed, setFormShowed] = useState(true);

  const handleFormSuccess = (values: TransliterateSettings) => {
    setFormShowed(false);
    setTransliterateContext(values);
  };

  const handleChangeSettings = () => setFormShowed(true);

  return (
    <Fragment>
      <Head>
        <title>Проверка правописания</title>
      </Head>
      <PageTitle>Проверка правописания</PageTitle>
      <div>
        {formShowed && (
          <Group position="left">
            <TransliterateForm initialValues={transliterateContext} onSuccess={handleFormSuccess} />
          </Group>
        )}
        {!formShowed && (
          <TransliterateExercise
            onChangeSettings={handleChangeSettings}
            settings={transliterateContext}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Home;
