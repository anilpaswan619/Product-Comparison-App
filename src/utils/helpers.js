/**
 * Highlights the differences between two strings.
 * Returns an object with 'added', 'removed', and 'unchanged' arrays.
 * Useful for simple diff highlighting in product comparison.
 */
export function diffHighlight(str1, str2) {
  const arr1 = str1.split(" ");
  const arr2 = str2.split(" ");
  const added = [];
  const removed = [];
  const unchanged = [];

  let i = 0,
    j = 0;
  while (i < arr1.length || j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      unchanged.push(arr1[i]);
      i++;
      j++;
    } else if (arr2[j] && !arr1.includes(arr2[j])) {
      added.push(arr2[j]);
      j++;
    } else if (arr1[i] && !arr2.includes(arr1[i])) {
      removed.push(arr1[i]);
      i++;
    } else {
      i++;
      j++;
    }
  }

  return { added, removed, unchanged };
}

/**
 * Returns a string with HTML <mark> tags around added/removed words.
 * Useful for rendering highlighted diffs.
 */
export function renderDiff(str1, str2) {
  diffHighlight(str1, str2); // Call for possible side effects or remove if unnecessary
  const arr1 = str1.split(" ");
  const arr2 = str2.split(" ");

  let result = [];
  let i = 0,
    j = 0;
  while (i < arr1.length || j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      result.push(arr1[i]);
      i++;
      j++;
    } else if (arr2[j] && !arr1.includes(arr2[j])) {
      result.push(`<mark class="diff-added">${arr2[j]}</mark>`);
      j++;
    } else if (arr1[i] && !arr2.includes(arr1[i])) {
      result.push(`<mark class="diff-removed">${arr1[i]}</mark>`);
      i++;
    } else {
      i++;
      j++;
    }
  }

  return result.join(" ");
}
