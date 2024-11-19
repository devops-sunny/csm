export const extractImageURLsFromHtml = (htmlString: string): string[] => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(htmlString, 'text/html');

  const images = doc.querySelectorAll('img');

  const urls = [...images].map((img) => img.getAttribute('src'));

  return urls.filter((url) => url !== null) as string[];
};
