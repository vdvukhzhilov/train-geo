import React, { PropsWithChildren } from 'react';
import { AppShell, Header, Text, useMantineTheme, ThemeIcon, Group, Box } from '@mantine/core';
import { Book } from 'tabler-icons-react';
import { AppNavbar, AppNavbarContextProvider, AppNavBurger } from './AppNavbar';

export const AppLayout: React.FC<PropsWithChildren<{}>> = (props) => {
  const theme = useMantineTheme();

  return (
    <AppNavbarContextProvider>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={<AppNavbar />}
        header={
          <Header height={70} p="md">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <Group>
                <ThemeIcon>
                  <Book />
                </ThemeIcon>

                <Text weight={'bold'} size="xl">
                  Train Geo
                </Text>
              </Group>

              <AppNavBurger />
            </div>
          </Header>
        }
      >
        {props.children}
      </AppShell>
    </AppNavbarContextProvider>
  );
};
