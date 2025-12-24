// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/WAAPI-interrupt.tsx
import { motion } from "motion/react";

export function WaapiInterruptDemo() {
    return (
        <div
        className="rounded-2xl flex flex-col items-center justify-center"
            style={{
                width: "375px",
                height: "812px",
                background: "linear-gradient(180deg, #35a1ea 0%, #2c8dcd 100%)",
            }}
        >
            <div
                className="relative m-auto self-center justify-self-center"
                style={{
                    width: "120px",
                    height: "120px",
                }}
            >
                <motion.img
                    className="avatar"
                    alt="avatar"
                    animate={{
                        scale   /**/: [1, 0.98, 1, 1, 1, 1],
                        y       /**/: [0, -20, 0, -2, 0, 0],
                        opacity /**/: [0.2, 1, 0.2, 0.2, 0.2, 0.2],
                    }}
                    transition={{ duration: 2.5, type: "spring", bounce: 1, repeat: Infinity, }}
                    style={{
                        width: "120px",
                        height: "120px",
                        opacity: 0.8,
                        willChange: "opacity",
                        filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.16))",
                    }}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" // Placeholder image
                />
                <motion.div
                    className="absolute left-0 top-0"
                    style={{
                        width: "120px",
                        height: "120px",
                        opacity: 0,
                        border: "2px solid #fff",
                        borderRadius: "120px",
                    }}
                />
            </div>
        </div>
    );
}
