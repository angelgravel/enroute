import { randomUUID } from "crypto";

export default function uniqueId(prefix?: string) {
  return prefix + randomUUID();
}
