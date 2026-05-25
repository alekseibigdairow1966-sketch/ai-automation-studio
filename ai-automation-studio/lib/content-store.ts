import fs from "fs/promises"
import path from "path"

const STORE_DIR = path.join(process.cwd(), "data", "store")

export async function readStore<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(STORE_DIR, `${key}.json`), "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export async function writeStore<T>(key: string, data: T): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true })
  await fs.writeFile(
    path.join(STORE_DIR, `${key}.json`),
    JSON.stringify(data, null, 2),
    "utf-8",
  )
}

export async function appendToStore<T>(key: string, item: T): Promise<void> {
  const arr = await readStore<T[]>(key, [])
  arr.unshift(item)
  await writeStore(key, arr)
}
