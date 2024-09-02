import { Rect, Layout, makeScene2D } from "@motion-canvas/2d";
import {
  createEffect,
  createRef,
  createSignal,
  spawn,
  waitFor,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const count = createSignal(0);
  const container = createRef<Layout>();

  view.add(<Layout alignItems={"center"} ref={container} layout />);
  const rectangle = (<Rect fill={"white"} />) as Rect;
  container().add(rectangle);
  yield* spawn(rectangle.size({ x: 200, y: 100 }, 2));

  const rectangles: Rect[] = [];
  createEffect(() => {
    const targetCount = Math.round(count());
    let i = rectangles.length;
    // add any missing circles
    for (; i < targetCount; i++) {
      const rectangle = (<Rect fill={"white"} />) as Rect;
      rectangles.push(rectangle);
      container().add(rectangle);
      spawn(rectangle.size({ x: 200, y: 100 }, 2));
    }
    // remove any extra circles
    for (; i > targetCount; i--) {
      const circle = rectangles.pop()!;
      spawn(circle.size(0, 0.3).do(() => circle.remove()));
    }
  });

  count(1);
  yield* waitFor(1);
  count(6);
  yield* waitFor(1);
  count(4);
  yield* count(0, 2);
  yield* waitFor(1);
});
