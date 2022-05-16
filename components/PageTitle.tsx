import { Divider, Title } from '@mantine/core';
import { FC, Fragment, PropsWithChildren } from 'react';

export const PageTitle: FC<PropsWithChildren<{}>> = (props) => {
  return (
    <Fragment>
      <Title mb={'xs'}>{props.children}</Title>
      <Divider mb={'xl'} />
    </Fragment>
  );
};
