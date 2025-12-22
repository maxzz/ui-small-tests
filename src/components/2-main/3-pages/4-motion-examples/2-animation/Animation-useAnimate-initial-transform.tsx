// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-useAnimate-initial-transform.tsx
import { useAnimate } from "motion/react";

export function AnimationUseAnimateInitialTransformDemo() {
    const [scope, animate] = useAnimate();

    return (
        <div className="App" ref={scope}>
            <div
                className="four"
                style={{
                    width: 50,
                    height: 50,
                    opacity: 0.5,
                    backgroundColor: "hotpink",
                    transform: "scale(0.1)",
                }}
            ></div>
            <p className="text-white">Take in original transform</p>
            <button
                className="px-2 py-1 bg-white text-black rounded"
                onClick={() => {
                    animate([
                        [
                            ".four",
                            { x: 90, scale: 2, opacity: 1 },
                            { duration: 2 },
                        ],
                    ]);
                }}
            >
                play
            </button>
        </div>
    );
}
