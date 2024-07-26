import process from "process";

const getPath = () => {
  switch (process.platform) {
    case "win32":
    case "cygwin":
      return `win-${process.arch}`;

    case "linux":
    case "android":
      return `linux-${process.arch}`;

    case "darwin":
      return `mac-${process.arch}`;
  }
};

export function loadBin(): LlamaCppNodeModule {
  const path = getPath();

  switch (path) {
    case "win-x64":
      return require("../../llamaBins/win-x64/llama-addon.node");
    case "mac-x64":
      return require("../../llamaBins/mac-x64/llama-addon.node");
    case "mac-arm64":
      return require("../../llamaBins/mac-arm64/llama-addon.node");
    case "linux-x64":
      return require("../../llamaBins/linux-x64/llama-addon.node");
    case "linux-armv7l":
      return require("../../llamaBins/linux-armv7l/llama-addon.node");
    case "linux-arm64":
      return require("../../llamaBins/linux-arm64/llama-addon.node");

    default:
      return require("../../llamaBins/win-x64/llama-addon.node");
  }
}

export type LlamaCppNodeModule = {
  LLAMAModel: LLAMAModel;
  LLAMAContext: LLAMAContext;
  LLAMAGrammar: LLAMAGrammar;
  LLAMAGrammarEvaluationState: LLAMAGrammarEvaluationState;
  systemInfo(): string;
};

export type LLAMAModel = {
  new (
    modelPath: string,
    params: {
      gpuLayers?: number;
      vocabOnly?: boolean;
      useMmap?: boolean;
      useMlock?: boolean;
    }
  ): LLAMAModel;
};

export type LLAMAContext = {
  new (
    model: LLAMAModel,
    params: {
      seed?: number;
      contextSize?: number;
      batchSize?: number;
      logitsAll?: boolean;
      embedding?: boolean;
      threads?: number;
    }
  ): LLAMAContext;
  encode(text: string): Uint32Array;
  eval(
    tokens: Uint32Array,
    options?: {
      temperature?: number;
      topK?: number;
      topP?: number;
      repeatPenalty?: number;
      repeatPenaltyTokens?: Uint32Array;
      repeatPenaltyPresencePenalty?: number; // alpha_presence
      repeatPenaltyFrequencyPenalty?: number; // alpha_frequency
      grammarEvaluationState?: LLAMAGrammarEvaluationState;
    }
  ): Promise<number>;
  decode(tokens: Uint32Array): string;
  tokenBos(): number;
  tokenEos(): number;
  tokenNl(): number;
  getContextSize(): number;
  getTokenString(token: number): string;
  printTimings(): void;
};

export type LLAMAGrammar = {
  new (
    grammarPath: string,
    params?: {
      printGrammar?: boolean;
    }
  ): LLAMAGrammar;
};

export type LLAMAGrammarEvaluationState = {
  new (grammar: LLAMAGrammar): LLAMAGrammarEvaluationState;
};
