// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args) => {
    // setTimeout doesn't return the function's actual return value
    // so we wrap it in a Promise
    return new Promise((resolve) => {
      clearTimeout(timeoutId);
      // resolve(Promise<any>) will wait for inner promise to resolve
      timeoutId = setTimeout(() => resolve(func(...args)), delay);
    });
  };
}

// capitalize first letter
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// get percentage
export function getPercentage(part: number, total: number): number {
  // if total is 0 avoid part to be devided by 0
  if (total === 0) return 0;
  const percentage = (part / total) * 100;
  return Math.round(percentage);
}
