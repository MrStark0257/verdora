/**
 * Resolve local asset URLs safely across both development and production (e.g. GitHub Pages subpaths)
 * Fully idempotent: strips any redundant base occurrences and ensures exact single base prefix.
 *
 * @param {string} path - URL or local path
 * @returns {string} Fully resolved path with proper base URL prefix
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const baseName = cleanBase.replace(/^\/+|\/+$/g, '');

  let normalized = path;
  if (baseName) {
    const noLeading = cleanBase.replace(/^\/+/, '');
    let changed = true;
    while (changed) {
      if (normalized.startsWith(cleanBase)) {
        normalized = normalized.slice(cleanBase.length);
      } else if (normalized.startsWith(noLeading)) {
        normalized = normalized.slice(noLeading.length);
      } else if (normalized.startsWith(`/${noLeading}`)) {
        normalized = normalized.slice(noLeading.length + 1);
      } else {
        changed = false;
      }
    }
  }

  const cleanPath = normalized.startsWith('/') ? normalized.slice(1) : normalized;
  return `${cleanBase}${cleanPath}`;
}
