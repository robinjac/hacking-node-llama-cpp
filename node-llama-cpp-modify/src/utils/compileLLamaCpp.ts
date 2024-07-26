import path from "path";
import { file } from "bun";
import { llamaDirectory } from "../config.js";

export async function getCompiledLlamaCppBinaryPath() {
  const compiledResultDirPath = await getCompiledResultDir();

  if (compiledResultDirPath == null) return null;

  const modulePath = path.join(compiledResultDirPath, "llama-addon.node");

  if (await file(modulePath).exists()) return modulePath;

  return null;
}

async function getCompiledResultDir() {
  if (await file(path.join(llamaDirectory, "build", "Release")).exists()) {
    return path.join(llamaDirectory, "build", "Release");
  } else if (await file(path.join(llamaDirectory, "build", "Debug")).exists()) {
    return path.join(llamaDirectory, "build", "Debug");
  }

  return null;
}
