
import { file } from "bun"
import {llamaBinsGrammarsDirectory, llamaCppGrammarsDirectory} from "../config.js";
import {getUsedBinFlag} from "./usedBinFlag.js";

export async function getGrammarsFolder() {
    const usedBinFlag = await getUsedBinFlag();

    if (usedBinFlag.use === "localBuildFromSource") {
        if (await file(llamaCppGrammarsDirectory).exists())
            return llamaCppGrammarsDirectory;
    } else if (usedBinFlag.use === "prebuiltBinaries") {
        if (await file(llamaBinsGrammarsDirectory).exists())
            return llamaBinsGrammarsDirectory;
        else if (await file(llamaCppGrammarsDirectory).exists())
            return llamaCppGrammarsDirectory;
    }

    throw new Error("Grammars folder not found");
}
