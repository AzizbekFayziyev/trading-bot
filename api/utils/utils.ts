import { Request, Response } from "express";

export function tryCatch(fn: (req: Request, res: Response) => Promise<any>, cleanup?: () => Promise<void>) {
    return async function (req: Request, res: Response) {
        try {
            await fn(req, res);
        } catch(err) {
            console.log(err);
            res.status(500).send({ success: false, data: "Internal error" });
        } finally {
            cleanup && await cleanup();
        }
    };
}

export function getTradingIdFromUrl(url: string) {
    const baseUrl = 'https://trade.zano.org/dex/trading/';
  
    if (!url.startsWith(baseUrl)) return;
    
    const id = url.slice(baseUrl.length);
    const numberId = parseInt(id, 10);

    if (isNaN(numberId)) return;
  
    return numberId;
  }

