export function formatAddress(address: string) {
  if (address == null || address.length === 0) {
    return "";
  }
  return (
    address.substring(0, 6) +
    "..." +
    address.substring(address.length - 4, address.length)
  );
}

export function isNullOrEmpty(str: string) {
  return str == null || str.length === 0;
}
