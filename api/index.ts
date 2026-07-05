import serverModule from '../.output/server/index.mjs';

export default async function handler(req: any, res: any) {
  try {
    const mod = serverModule && (serverModule.default ?? serverModule);
    if (!mod || typeof mod.fetch !== 'function') {
      res.statusCode = 500;
      res.end('Server entry not found');
      return;
    }

    const proto = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || req.headers['x-forwarded-host'] || 'localhost';
    const url = `${proto}://${host}${req.url || '/'}"`.replace(/\"$/,'');

    const init: any = { method: req.method, headers: req.headers };
    if (req.method !== 'GET' && req.method !== 'HEAD') init.body = req.body ?? req;

    const request = new Request(url, init);
    const response = await mod.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      try { res.setHeader(key, value as any); } catch {}
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.end(buffer);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
