// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/animate-stress-headless-color.tsx
import { useEffect } from "react";
import { animate } from "motion/react";

export function TestAnimateStressHeadlessColorDemo() {
    useEffect(() => {
        let count = 0;
        for (let i = 0; i < 2000; i++) {
            count++;
            animate("rgba(0,0,0,0)", "rgba(255,255,255,1)", { duration: 20 });
        }

        console.log("started ", count, "animations");
    });

    return <div className="p-10 text-white">Headless color animation stress test (Check console)</div>;
}

