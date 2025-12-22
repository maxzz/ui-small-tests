// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/WAAPI-interrupt.tsx
import { motion } from "motion/react";

export function WaapiInterruptDemo() {
    return (
        <div
            style={{
                width: "375px",
                height: "812px",
                borderRadius: "16px",
                background: "linear-gradient(180deg, #35a1ea 0%, #2c8dcd 100%)",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexFlow: "column",
            }}
        >
            <div
                style={{
                    position: "relative",
                    margin: "auto",
                    alignSelf: "center",
                    justifySelf: "center",
                    width: "120px",
                    height: "120px",
                }}
            >
                <motion.img
                    alt="avatar"
                    animate={{
                        scale: [1, 0.98, 1, 1, 1, 1],
                        y: [0, -20, 0, -2, 0, 0],
                        opacity: [0.2, 1, 0.2, 0.2, 0.2, 0.2],
                    }}
                    transition={{
                        duration: 2.5,
                        type: "spring",
                        bounce: 1,
                        repeat: Infinity,
                    }}
                    style={{
                        width: "120px",
                        height: "120px",
                        willChange: "opacity",
                        opacity: 0.8,
                        filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.16))",
                    }}
                    className="avatar"
                    // Placeholder image
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                />
                <motion.div
                    style={{
                        opacity: 0,
                        position: "absolute",
                        height: "120px",
                        width: "120px",
                        border: "2px solid #fff",
                        borderRadius: "120px",
                        top: 0,
                        left: 0,
                    }}
                />
            </div>
        </div>
    );
}
