export function binarySearchString(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1; 

    let mid = Math.floor((left + right) / 2);
    let comparison = arr[mid].toLowerCase().localeCompare(target); 

    if (comparison === 0) return mid;
    if (comparison < 0) return binarySearchString(arr, target, mid + 1, right);
    return binarySearchString(arr, target, left, mid - 1);
}