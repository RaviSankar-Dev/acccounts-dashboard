import { NextResponse } from 'next/server';
import client from '@/lib/db';

export async function GET() {
  try {
    const result = await client.execute('SELECT * FROM deals');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await client.execute({
      sql: 'INSERT INTO deals (id, client, total, advance, balance, progress, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [data.id, data.client, data.total, data.advance, data.balance, data.progress, data.status]
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
