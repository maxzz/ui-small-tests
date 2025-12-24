// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/WAAPI-background-color.tsx
import { useState } from "react";
import { motion } from "motion/react";

export function WaapiBackgroundColorDemo() {
    const [state, setState] = useState(false);

    return (
        <div className="p-10">
            <motion.div
                initial={{ backgroundColor: "#00f" }}
                animate={{ backgroundColor: state ? "#00f" : "#f00" }}
                transition={{ duration: 1 }}
                style={style}
                onClick={() => setState(!state)}
            />
            
            <p className="mt-4 text-sm text-muted-foreground">
                Click the box to animate background color using WAAPI (if supported/enabled)
            </p>
        </div>
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
};
