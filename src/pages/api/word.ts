import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from "next";
import { fauna } from "../../services/fauna";

const resolveWord = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const todaysWord: any = await fauna.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('todaysWord'))),
        q.Lambda(x => q.Get(x))
      )
    )

    if (new Date(todaysWord.data[0].data.data.last_time_drawn).getDate() - new Date().getDate() <= -1) {
      const words: any = await fauna.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('words'))),
          q.Lambda(x => q.Get(x))
        )
      )
      const wordsValue = [];

      words.data.forEach(word => {
        wordsValue.push(word);
      })

      const randomNumber = Math.floor(Math.random() * wordsValue.length)

      const wordRandomized = wordsValue[randomNumber];

      const updatedWord = await fauna.query(
        q.Update(
          wordRandomized.ref,
          {
            data: {
              last_time_drawn: new Date().toISOString()
            }
          }
        )
      )

      await fauna.query(
        q.Replace(
          todaysWord.data[0].ref, {
          data: updatedWord
        }
        )
      )
    }

    return res.status(200).json({ word: todaysWord.data[0].data.data.value })
  }
  catch (err) {
    return res.status(400).json({ err })
  }

}

export default resolveWord;