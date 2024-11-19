import { ReasonPhrases } from 'http-status-codes';
import { JSDOM } from 'jsdom';

import { NextApiErrorResponse } from '@shared/utils/next-api-error-response';

type BodyPayload = {
  url: string;
};

export type PreviewLinkResponse = {
  hostname: string;
  title: string;
  description: string;
  image: string;
};

export async function POST(request: Request) {
  const requestBody = (await request.json()) as BodyPayload;

  const paramErrors: string[] = [];

  if (!requestBody.url) {
    paramErrors.push(
      'URL is required. Please provide a URL to generate a preview.',
    );
  }

  if (paramErrors.length) {
    return NextApiErrorResponse({
      errors: paramErrors.map((error) => ({ error })),
      reason: ReasonPhrases.BAD_REQUEST,
    });
  }

  try {
    const webUrl = requestBody.url;

    const { hostname } = new URL(webUrl);

    const response = await fetch(webUrl);

    const html = await response.text();

    const dom = new JSDOM(html);

    const { document } = dom.window;

    const metaTags = [...document.querySelectorAll('meta')];

    const previewData = {
      hostname,
      title: document.querySelector('title')?.textContent ?? '',
      description: '',
      image: '',
    };

    metaTags.forEach((tag) => {
      const tagProperty = tag.getAttribute('property');

      if (tagProperty === 'og:description') {
        previewData.description = tag.getAttribute('content') ?? '';
      }

      if (tagProperty === 'og:image') {
        previewData.image = tag.getAttribute('content') ?? '';
      }
    });

    const headers = (() => {
      const newHeader = new Headers();

      newHeader.set('Content-Type', 'application/json');

      return newHeader;
    })();

    return new Response(JSON.stringify(previewData), { headers });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextApiErrorResponse({
        errors: [
          {
            error: `An error occurred while parse the preview lin: ${error.message}`,
          },
        ],
        reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
