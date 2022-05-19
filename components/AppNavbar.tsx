import {
  Anchor,
  Burger,
  MediaQuery,
  Navbar,
  useMantineTheme,
  Group,
  ThemeIcon,
  Text,
  MantineColor,
  ThemeIconVariant,
} from '@mantine/core';
import Link from 'next/link';
import {
  createContext,
  Dispatch,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Writing, Pencil } from 'tabler-icons-react';
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

type AppNavbarItemProps = {
  href: string;
  icon?: React.ReactNode;
  iconColor?: MantineColor;
  iconVariant?: ThemeIconVariant;
  text: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const AppNavbarItem: React.FC<AppNavbarItemProps> = (props) => {
  const { href, icon, text, iconColor, onClick, iconVariant = 'light' } = props;
  return (
    <Link href={href} passHref>
      <Anchor mb="xl" onClick={onClick}>
        {icon ? (
          <Group>
            <ThemeIcon color={iconColor} variant={iconVariant}>
              {icon}
            </ThemeIcon>
            <Text size="sm">{text}</Text>
          </Group>
        ) : (
          <Text size="sm">{text}</Text>
        )}
      </Anchor>
    </Link>
  );
};

export const AppNavbar = () => {
  const { opened, setOpened } = useContext(AppNavbarContext);
  const { spacing } = useMantineTheme();

  const handleNavLinkClick = useCallback(() => setOpened(false), []);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: spacing.xl * 11, lg: spacing.xl * 12 }}
    >
      <AppNavbarItem
        onClick={handleNavLinkClick}
        icon={<Writing />}
        href="/transliterate"
        text="Проверка правописания"
      />
      <AppNavbarItem
        onClick={handleNavLinkClick}
        icon={<Pencil />}
        href="/words"
        text="Слова на проверку"
      />
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
