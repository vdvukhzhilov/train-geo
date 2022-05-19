import { Divider, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC, Fragment, PropsWithChildren, useMemo } from 'react';

export const PageTitle: FC<PropsWithChildren<{}>> = (props) => {
  const { breakpoints, fontSizes } = useMantineTheme();

  const isLessThanMd = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  return (
    <Fragment>
      <Title
        sx={
          isLessThanMd
            ? {
                fontSize: fontSizes.xl,
              }
            : undefined
        }
        mb={'xs'}
      >
        {props.children}
      </Title>
      {isLessThanMd ? (
        <Divider key="DividerMobile" mb={'lg'} />
      ) : (
        <Divider key="DividerDesktop" mb={'xl'} />
      )}
    </Fragment>
  );
};
