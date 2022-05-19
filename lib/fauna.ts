import { Client, query } from 'faunadb';

export const faunaClient = new Client({
  secret: process.env.FAUNA_ADMIN_KEY as string,
});

export const queryWordsToLearn = async () => {
  const result = await faunaClient.query(
    query.Map(
      query.Paginate(query.Documents(query.Collection('WordsToLearn'))),
      query.Lambda((wordToLearn) => query.Get(wordToLearn))
    )
  );

  // @ts-ignore
  return result?.data?.map(({ data }) => data);
};
