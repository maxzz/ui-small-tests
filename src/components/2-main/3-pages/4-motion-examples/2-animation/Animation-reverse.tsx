// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-reverse.tsx
import { useAnimate } from "motion/react";

export function AnimationReverseDemo() {
    const [scope, animate] = useAnimate();

    return (
        <div className="App" ref={scope}>
            <div
                className="four"
                style={{ width: 50, height: 50, backgroundColor: "blue" }}
            ></div>
            <p>reverse</p>
            <button
                className="px-2 py-1 bg-white text-black rounded"
                onClick={() => {
                    const animation = animate([
                        "my label",
                        [".four", { x: 90 }, { duration: 2 }],
                    ]);

                    animation.time = animation.duration;
                    animation.speed = -1;
                }}
            >
                play
            </button>
        </div>
    );
}
