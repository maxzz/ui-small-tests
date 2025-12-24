// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useTransform-with-useLayoutEffect.tsx
import { motion, useTransform, useScroll } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function HooksUseTransformWithUseLayoutEffectDemo() {
    const [elementTop, setElementTop] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll(); // useViewportScroll() is deprecated

    useLayoutEffect(
        () => {
            if (!ref.current) return;
            setElementTop(ref.current.offsetTop);
        }, [ref]
    );

    const opacity = useTransform(scrollY, [elementTop, elementTop + 600], [1, 0]);

    useEffect(
        () => {
            const log = () => console.log(elementTop, scrollY.get(), opacity.get());

            window.addEventListener("scroll", log);
            return () => window.removeEventListener("scroll", log);
        }, [elementTop, scrollY, opacity]
    );

    return (
        <div className="overflow-auto h-[500px] w-full bg-slate-100 relative">
            <div style={{ height: "400vh", backgroundColor: "lightblue", }} />

            <div ref={ref} style={{ height: "200vh", width: "100%", position: "absolute", top: "100vh" }}>
                <motion.div
                    initial={{ background: "#f9cb29" }}
                    style={{ position: "sticky", top: 0, opacity, }}
                >
                    <div className="relative w-full h-screen text-center flex flex-col items-center justify-center">
                        Hi!
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
