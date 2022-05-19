import { Box, LoadingOverlay } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { PageTitle } from '../components/PageTitle';
import { WordsExercise } from '../components/WordsExercise';

const Words: NextPage = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('api/getWordsToLearn')
      .then((res) => res.json())
      .then(setWords)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  

  return (
    <Fragment>
      <Head>
        <title>Слова на проверку</title>
      </Head>
      <PageTitle>Слова на проверку</PageTitle>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        {!loading && <WordsExercise words={words} />}
        <LoadingOverlay visible={loading} />
      </Box>
    </Fragment>
  );
};

export default Words;
