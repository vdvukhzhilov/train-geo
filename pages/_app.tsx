import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@mantine/hooks';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppLayout } from '../components/AppLayout';

const COLOR_THEME_COOKIE_NAME = 'train-geo-color-scheme';
const COLOR_THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  // hook will return either 'dark' or 'light' on client
  // and always 'light' during ssr as window.matchMedia is not available
  const preferredColorScheme = useColorScheme();

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookies(COLOR_THEME_COOKIE_NAME, nextColorScheme, {
      maxAge: COLOR_THEME_COOKIE_MAX_AGE,
    });
  };

  useEffect(() => {
    if (preferredColorScheme !== colorScheme) {
      setColorScheme(preferredColorScheme);
      // when color scheme is updated save it to cookie
      setCookies(COLOR_THEME_COOKIE_NAME, preferredColorScheme, {
        maxAge: COLOR_THEME_COOKIE_MAX_AGE,
      });
    }
  }, [preferredColorScheme, colorScheme]);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie(COLOR_THEME_COOKIE_NAME, ctx) || 'light',
});
