export function formatAddress(address: string) {
  return (
    address.substring(0, 6) +
    "..." +
    address.substring(address.length - 4, address.length)
  );
}

export function isNullOrEmpty(str: string) {
  return str == null || str.length === 0;
}
