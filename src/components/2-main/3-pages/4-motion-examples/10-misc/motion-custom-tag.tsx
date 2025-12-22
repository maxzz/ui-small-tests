// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/motion-custom-tag.tsx
import { motion } from "motion/react";

/**
 * An example of creating a `motion` version of a custom element. This will render <global> into the HTML
 */

export function MotionCustomTagDemo() {
    // Custom elements (web components) usually have dashes in names
    const CustomComponent = motion.create("my-custom-element");

    return (
        <div className="p-10">
            <CustomComponent
                data-testid="custom-element"
                style={{ width: 100, height: 100, background: "white", display: "block" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            />
             <p className="mt-4 text-sm text-muted-foreground">Renders a &lt;my-custom-element&gt; tag</p>
        </div>
    );
}

