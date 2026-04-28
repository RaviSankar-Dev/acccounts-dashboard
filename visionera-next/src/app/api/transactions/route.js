import { NextResponse } from 'next/server';
import client from '@/lib/db';

export async function GET() {
  try {
    const result = await client.execute('SELECT * FROM transactions ORDER BY date DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await client.execute({
      sql: 'INSERT INTO transactions (id, date, client, account, amount, type, mode) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [data.id, data.date, data.client, data.account, data.amount, data.type, data.mode]
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
