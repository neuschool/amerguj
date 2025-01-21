import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const envVars = {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY: process.env.CONTENTFUL_DELIVERY,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  };

  const maskedVars = Object.entries(envVars).reduce((acc, [key, value]) => {
    acc[key] = value ? `${value.slice(0, 4)}...${value.slice(-4)}` : 'not set';
    return acc;
  }, {});

  res.status(200).json(maskedVars);
} 