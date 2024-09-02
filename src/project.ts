import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import audio from "../audio/o_n_algo.wav";

export default makeProject({
  scenes: [example],
  audio: audio,
});
