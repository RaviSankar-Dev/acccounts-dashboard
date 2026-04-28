import { NextResponse } from 'next/server';
import client from '@/lib/db';

export async function GET() {
  try {
    const result = await client.execute('SELECT * FROM quotations ORDER BY date DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await client.execute({
      sql: 'INSERT INTO quotations (id, client, project, amount, status, date) VALUES (?, ?, ?, ?, ?, ?)',
      args: [data.id, data.client, data.project, data.amount, data.status, data.date]
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
