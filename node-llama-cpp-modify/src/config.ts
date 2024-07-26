import { join } from "path";
import { tmpdir } from "os";
import process from "process";

export const llamaDirectory = "llama";

export const llamaToolchainsDirectory = "toolchains";

export const llamaBinsDirectory = "llamaBins";

export const llamaBinsGrammarsDirectory = "grammars"

export const llamaCppGrammarsDirectory = join(
  llamaDirectory,
  "llama.cpp",
  "grammars"
);

export const tempDownloadDirectory = join(
  tmpdir(),
  "node-llama-cpp",
  crypto.randomUUID()
);
export const usedBinFlagJsonPath = join(llamaDirectory, "usedBin.json");

export const llamaCppDirectoryTagFilePath = join(
  llamaDirectory,
  "llama.cpp.tag.json"
);

export const defaultLlamaCppMetalSupport = process.platform === "darwin";

export const defaultLlamaCppCudaSupport = false;

export const defaultSkipDownload = false;

export const defaultChatSystemPrompt =
  "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible.\n" +
  "If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. " +
  "If you don't know the answer to a question, please don't share false information.";
