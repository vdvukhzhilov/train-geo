import React, { PropsWithChildren, useCallback, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Anchor,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ThemeIcon,
  Group,
} from '@mantine/core';
import { Book } from 'tabler-icons-react';
import Link from 'next/link';

export const Layout: React.FC<PropsWithChildren<{}>> = (props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const handleNavLinkClick = useCallback(() => setOpened(false), []);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Link href="/transliterate" passHref>
            <Anchor onClick={handleNavLinkClick}>Проверка правописания</Anchor>
          </Link>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group>
              <ThemeIcon>
                <Book />
              </ThemeIcon>

              <Text>Train Geo</Text>
            </Group>
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
};
