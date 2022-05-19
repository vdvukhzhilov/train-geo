import type { NextApiRequest, NextApiResponse } from 'next';
import { queryWordsToLearn } from '../../lib/fauna';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const result = await queryWordsToLearn();
  res.status(200).json(result);
};
