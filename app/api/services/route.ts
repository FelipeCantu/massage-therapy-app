import { NextResponse } from 'next/server';
import { defaultServices, type Service } from '@/lib/services';
import path from 'path';
import fs from 'fs/promises';

const BLOB_PATH = 'angel-face/services.json';
const LOCAL_PATH = path.join(process.cwd(), 'data', 'services.json');

const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

// ── Local file helpers (dev fallback) ────────────────────────────────────────
async function readLocal(): Promise<Service[]> {
  try {
    const raw = await fs.readFile(LOCAL_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return defaultServices;
  }
}

async function writeLocal(services: Service[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, JSON.stringify(services, null, 2), 'utf8');
}

// ── Blob helpers (production) ─────────────────────────────────────────────────
async function readBlob(): Promise<Service[]> {
  const { list, } = await import('@vercel/blob');
  const { blobs } = await list({ prefix: BLOB_PATH });
  if (blobs.length === 0) return defaultServices;
  const res = await fetch(blobs[0].url, { cache: 'no-store' });
  return res.json();
}

async function writeBlob(services: Service[]): Promise<void> {
  const { put } = await import('@vercel/blob');
  await put(BLOB_PATH, JSON.stringify(services), {
    access: 'public',
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

// ── Route handlers ────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const services = hasBlob ? await readBlob() : await readLocal();
    return NextResponse.json(services);
  } catch {
    return NextResponse.json(defaultServices);
  }
}

export async function PUT(req: Request) {
  try {
    const services: Service[] = await req.json();
    if (!Array.isArray(services)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    if (hasBlob) {
      await writeBlob(services);
    } else {
      await writeLocal(services);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Failed to save services:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
