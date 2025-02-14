export function extractTokenFromHeader(
  headers: Record<string, string | string[] | undefined>,
): string | undefined {
  const [type, token] = headers.authorization?.toString().split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}