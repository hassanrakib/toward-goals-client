"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// revalidateTag & revalidatePath apis can't be used directly
// in a client component
// so we are making them to live in a server action
// and server actions can be used in client components

export async function revalidateCacheByTag(tag: string) {
  revalidateTag(tag);
}

export async function revalidateCacheByPath(path: string) {
  revalidatePath(path);
}
