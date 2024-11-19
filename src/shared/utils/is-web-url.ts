export function isWebURL(input: string) {
  const urlPattern =
    /(http(s)?:\/\/.)?(www\.)?[\w#%+.:=@~-]{2,256}\.[a-z]{2,6}\b([\w#%&+./:=?@~-]*)/i;

  return urlPattern.test(input);
}
