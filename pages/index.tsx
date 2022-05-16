import { Container, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { PageTitle } from '../components/PageTitle';

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Train Geo</title>
      </Head>
      <Container fluid>
        <PageTitle>Train Geo</PageTitle>
        <Text>Выбирите упражнение в меню</Text>
      </Container>
    </Fragment>
  );
};

export default Home;
