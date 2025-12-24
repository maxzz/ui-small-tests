// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/animate-stress-headless-x.tsx
import { useEffect } from "react";
import { animate } from "motion/react";

export function TestAnimateStressHeadlessXDemo() {
    useEffect(() => {
        let count = 0;
        for (let i = 0; i < 2000; i++) {
            count++;
            animate(0, 100, { duration: 20, ease: "linear" });
        }

        console.log("started ", count, "animations");
    });

    return <div className="p-10 text-white">Headless X animation stress test (Check console)</div>;
}

