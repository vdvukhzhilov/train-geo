import { Divider, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC, Fragment, PropsWithChildren } from 'react';

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
      <Divider mb={isLessThanMd ? 'lg' : 'xl'} />
    </Fragment>
  );
};
