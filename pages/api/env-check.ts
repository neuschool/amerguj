import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const envVars = {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY: process.env.CONTENTFUL_DELIVERY,
    NODE_ENV: process.env.NODE_ENV,
  };

  const maskedVars = Object.entries(envVars).reduce((acc, [key, value]) => {
    acc[key] = value ? 'present' : 'missing';
    return acc;
  }, {});

  res.status(200).json(maskedVars);
} 