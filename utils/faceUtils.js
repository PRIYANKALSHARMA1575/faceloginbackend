

export function euclideanDistance(d1, d2) {
  let sum = 0;
  for (let i = 0; i < d1.length; i++) {
    sum += (d1[i] - d2[i]) ** 2;
  }
  return Math.sqrt(sum);
}

// Compare two descriptors
export function compareDescriptors(descriptor1, descriptor2, threshold = 0.5) {
  if (!descriptor1 || !descriptor2) return false;

  let sum = 0;
  for (let i = 0; i < descriptor1.length; i++) {
    sum += Math.pow(descriptor1[i] - descriptor2[i], 2);
  }
  const distance = Math.sqrt(sum);
  return distance < threshold;
}