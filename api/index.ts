import type { IncomingMessage, ServerResponse } from 'http';
import serverEntry from '../src/server';

type VercelServerContext = {
  waitUntil: (promise: Promise<unknown>) => void;
};

type VercelRequestHandler = {
  fetch(request: Request, env: unknown, context: VercelServerContext): Promise<Response>;
};

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const mod = serverEntry as VercelRequestHandler;

  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';

  function parseStack(err: unknown) {
    const stack = err instanceof Error && err.stack ? err.stack : String(err);
    const lines = stack.split('\n').map((l) => l.trim()).filter(Boolean);
    const candidate = lines.find((l) => l.includes('/src/') || l.includes('\\src\\')) || lines[1] || lines[0] || '';
    const match = /(?:at )?(?:.*\()?(.+):(\d+):(\d+)\)?/.exec(candidate);
    return {
      stack,
      frame: candidate || 'unknown',
      file: match ? match[1] : 'unknown',
      line: match ? Number(match[2]) : -1,
      column: match ? Number(match[3]) : -1,
    };
  }

  // Wrap entire lifecycle in try/catch to prevent Vercel default HTML error page
  try {
    if (!mod || typeof mod.fetch !== 'function') {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ success: false, error: 'Server entry not found', step: 'load_entry' }));
      return;
    }

    const proto = (req.headers['x-forwarded-proto'] as string | undefined) || 'http';
    const host = (req.headers.host as string | undefined) || (req.headers['x-forwarded-host'] as string | undefined) || 'localhost';
    const url = `${proto}://${host}${req.url ?? '/'}`;

    const requestHeaders = new Headers();
    for (const [headerName, headerValue] of Object.entries(req.headers)) {
      if (headerValue === undefined) continue;
      if (Array.isArray(headerValue)) {
        for (const value of headerValue) {
          requestHeaders.append(headerName, value);
        }
      } else if (typeof headerValue === 'string') {
        requestHeaders.set(headerName, headerValue);
      }
    }

    const init: RequestInit = {
      method: (req.method as string) ?? 'GET',
      headers: requestHeaders,
    };

    if (init.method !== 'GET' && init.method !== 'HEAD') {
      init.body = req as unknown as BodyInit;
    }

    const request = new Request(url, init);
    const context: VercelServerContext = {
      waitUntil: (promise: Promise<unknown>) => {
        if (promise && typeof (promise as any).then === 'function') {
          (promise as Promise<unknown>).catch(() => {});
        }
      },
    };

    const response = await mod.fetch(request, process.env as unknown, context);

    res.statusCode = response.status;
    response.headers.forEach((value: string, key: string) => {
      try {
        res.setHeader(key, value);
      } catch {
        // ignore invalid header writes
      }
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.end(buffer);
  } catch (err) {
    // Always log rich details to function logs
    const info = parseStack(err);
    console.error('Vercel function wrapper error:', {
      name: err instanceof Error ? err.name : 'Error',
      message: err instanceof Error ? err.message : String(err),
      stack: info.stack,
      file: info.file,
      line: info.line,
      frame: info.frame,
    });

    // Development: return detailed JSON
    res.setHeader('content-type', 'application/json; charset=utf-8');
    if (!isProd) {
      const payload = {
        success: false,
        error: err instanceof Error ? err.message : String(err),
        stack: info.stack,
        file: info.file,
        line: info.line,
        step: 'invoke_handler',
      };
      res.statusCode = 500;
      res.end(JSON.stringify(payload, null, 2));
      return;
    }

    // Production: return non-sensitive JSON while logs contain full details
    const prodPayload = { success: false, error: 'Internal Server Error', step: 'invoke_handler' };
    res.statusCode = 500;
    res.end(JSON.stringify(prodPayload));
  }
}
