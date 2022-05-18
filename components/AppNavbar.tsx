import { Anchor, Burger, MediaQuery, Navbar, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

type AppNavbarContextState = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export const AppNavbarContext = createContext<AppNavbarContextState>({} as AppNavbarContextState);

export function AppNavbarContextProvider(props: PropsWithChildren<{}>) {
  const [opened, setOpened] = useState(false);

  return (
    <AppNavbarContext.Provider
      value={{
        opened,
        setOpened,
      }}
    >
      {props.children}
    </AppNavbarContext.Provider>
  );
}

export const AppNavbar = () => {
  const { opened, setOpened } = useContext(AppNavbarContext);

  const handleNavLinkClick = useCallback(() => setOpened(false), []);

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Link href="/transliterate" passHref>
        <Anchor onClick={handleNavLinkClick}>Проверка правописания</Anchor>
      </Link>
    </Navbar>
  );
};

export const AppNavBurger = () => {
  const theme = useMantineTheme();
  const { opened, setOpened } = useContext(AppNavbarContext);

  const handleBurgerClick = useCallback(() => setOpened((o) => !o), []);

  return (
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      <Burger opened={opened} onClick={handleBurgerClick} size="sm" color={theme.colors.gray[6]} />
    </MediaQuery>
  );
};
