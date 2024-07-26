type UsedBinFlagFile = {
  use: "prebuiltBinaries" | "localBuildFromSource";
};

export function getUsedBinFlag(): UsedBinFlagFile {
  return { use: "prebuiltBinaries" };
}
