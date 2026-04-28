import { NextResponse } from 'next/server';
import client from '@/lib/db';

export async function GET() {
  try {
    const result = await client.execute('SELECT * FROM projects');
    // Parse team JSON string back to array
    const rows = result.rows.map(row => ({
      ...row,
      team: JSON.parse(row.team || '[]')
    }));
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await client.execute({
      sql: 'INSERT INTO projects (id, name, client, progress, deadline, status, team) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [data.id, data.name, data.client, data.progress, data.deadline, data.status, JSON.stringify(data.team)]
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
