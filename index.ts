import {
    LlamaModel,
    LlamaContext,
    LlamaChatSession,
  } from "./node-llama-cpp-modify/src";
  
  /* 
  
  this runs compiled (however, then we get issues with llama not finding gpu drivers)
  const model = new LlamaModel({
    modelPath: process.cwd() + "/desktop/projects/sentinel/model/model.gguf",
  }); 
  
  */
  
  const model = new LlamaModel({
    modelPath: "./model/model.gguf",
  });
  
  const context = new LlamaContext({ model });
  const session = new LlamaChatSession({ context });
  
  const q1 = "Hi there, how are you?";
  console.log("User: " + q1);
  
  const a1 = await session.prompt(q1);
  console.log("AI: " + a1);
  
  const q2 = "Summerize what you said";
  console.log("User: " + q2);
  
  const a2 = await session.prompt(q2);
  console.log("AI: " + a2);