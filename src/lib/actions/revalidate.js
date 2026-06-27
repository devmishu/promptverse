'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateAnyPath(path) {
    revalidatePath(`${path}`);
}