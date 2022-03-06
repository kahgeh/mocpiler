export function getFileName(pathname: String) {
  return pathname.substring(pathname.lastIndexOf('/') + 1).replace('.ts', '');
}
