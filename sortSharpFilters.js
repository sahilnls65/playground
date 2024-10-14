function sortArrayAndNestedObjects(array) {
  return array
    .sort(([a], [b]) => a.localeCompare(b)) // Sort top-level elements
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        const sortedObject = Object.keys(value)
          .sort()
          .reduce((obj, k) => {
            obj[k] = value[k];
            return obj;
          }, {});
        return [key, sortedObject];
      }
      return [key, value];
    });
}

// Example usage:
const transforms = [
  ["blur", 10],
  ["tint", "rgb(255, 0, 0)"],
  ["expand", { right: 100, bottom: 100 }],
  ["resize", { width: 800, height: 600 }],
  ["rotate", 90],
  ["grayscale"],
  ["flip"],
  ["sharpen", 3],
  ["threshold", 200],
  ["negate"],
  ["extract", { left: 50, top: 50, width: 400, height: 300 }],
  ["trim", { threshold: 10 }],
  ["flatten", { background: "#ffffff" }],
  ["median", 3],
  ["convolve", { width: 3, height: 3, kernel: [-1, -1, -1, 0, 0, 0, 1, 1, 1] }],
  ["modulate", { brightness: 2, saturation: 1.5, hue: 90 }],
  ["toFormat", "jpeg"],
];

const sortedTransforms = sortArrayAndNestedObjects(transforms);
console.log(sortedTransforms);
