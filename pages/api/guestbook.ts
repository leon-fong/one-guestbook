
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseClient } from '../../lib/supabase';

export default async function guestbook(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === 'POST') {
      const {data, error} = await supabaseClient.from('guestbook').insert([ req.body ] )
      if(error) return res.status(500).json(error)
      return res.status(200).json(data)
    }

  const { data } = await supabaseClient
  .from('guestbook')
  .select('*')

  return res.status(200).json(data)
}
