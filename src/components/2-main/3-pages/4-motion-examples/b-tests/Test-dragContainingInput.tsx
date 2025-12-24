// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragContainingInput.tsx
import { motion } from "motion/react";

export function TestDragContainingInputDemo() {
    return (
        <div className="p-10">
            <motion.div drag style={styleA} className="flex flex-col gap-2 p-4">

                <input placeholder="Input" className="p-1" />

                <div>
                    <input type="radio" id="huey" name="drone" value="huey" defaultChecked />
                    <label htmlFor="huey" className="text-white ml-2">
                        Huey
                    </label>
                </div>

                <div>
                    <input type="radio" id="b" name="drone" value="b" />
                    <label htmlFor="b" className="text-white ml-2">
                        Dewey
                    </label>
                </div>

                <textarea placeholder="Textarea" className="p-1" />

                <select className="p-1">
                    <option>
                        Test
                    </option>
                </select>

            </motion.div>
        </div>
    );
}

const styleA = {
    width: 300,
    height: 300,
    background: "blue",
};
