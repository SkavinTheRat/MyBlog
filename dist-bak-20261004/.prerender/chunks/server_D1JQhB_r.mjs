import { g as getCollection } from './_astro_content_C8cOROfu.mjs';

async function getBlogCollection(contentType = "blog") {
  return await getCollection(contentType, ({ data }) => {
    return !data.draft ;
  });
}
function getYearFromCollection(collection) {
  const dateStr = collection.data.updatedDate ?? collection.data.publishDate;
  return dateStr ? new Date(dateStr).getFullYear() : void 0;
}
function groupCollectionsByYear(collections) {
  const collectionsByYear = collections.reduce((acc, collection) => {
    const year = getYearFromCollection(collection);
    if (year !== void 0) {
      if (!acc.has(year)) {
        acc.set(year, []);
      }
      acc.get(year)?.push(collection);
    }
    return acc;
  }, /* @__PURE__ */ new Map());
  return Array.from(
    collectionsByYear.entries()
  ).sort((a, b) => b[0] - a[0]);
}
function sortMDByDate(collections) {
  return collections.sort((a, b) => {
    const aPin = "pin" in a.data && a.data.pin === true;
    const bPin = "pin" in b.data && b.data.pin === true;
    if (aPin !== bPin) {
      return Number(bPin) - Number(aPin);
    }
    const aDate = new Date(a.data.publishDate ?? 0).valueOf();
    const bDate = new Date(b.data.publishDate ?? 0).valueOf();
    return bDate - aDate;
  });
}
function getAllTags(collections) {
  return collections.flatMap((collection) => [...collection.data.tags]);
}
function getUniqueTags(collections) {
  return [...new Set(getAllTags(collections))];
}
function getUniqueTagsWithCount(collections) {
  return [
    ...getAllTags(collections).reduce(
      (acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
      /* @__PURE__ */ new Map()
    )
  ].sort((a, b) => b[1] - a[1]);
}

export { groupCollectionsByYear as a, getUniqueTagsWithCount as b, getUniqueTags as c, getBlogCollection as g, sortMDByDate as s };
