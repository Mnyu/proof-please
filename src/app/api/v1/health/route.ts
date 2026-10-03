import { NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json(
    {
      status: 'UP',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? 'unknown',
      environment: process.env.NODE_ENV,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
};
