/**
 * genarate a page title form path
 */

export const genaratePageTitile = (path) => {
  return path.replace(/-/g, " ").replace(/\//g, "");
};
