import { type ComponentPropsWithoutRef } from "react";
import { motion, type PanInfo, useDragControls } from "motion/react"; //https://www.youtube.com/watch?v=UEzt1vp2p6k&t=112s
import { IconDndTarget } from "./27-dnd-target";
// import { stateNapiPosTracker } from "@/store/7-napi-atoms";
import { debouncedSetNapiGetPosXY } from "./8-set-position";
import { stateNapiPosTracker } from "./9-types";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PopoverContent } from "../shadcn/popover";

export function TestTargetWindowPositionWReset({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className="relative size-12 bg-primary-900 rounded-sm cursor-pointer" {...rest}>
            <MovingIcon />
        </div>
    );
}

function MovingIcon() {
    // const { getPosProgress } = useSnapshot(napiBuildProgress);
    const dragControls = useDragControls();

    function onDrag(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        // console.log(roundInt(info.point.x), roundInt(info.point.y));
        debouncedSetNapiGetPosXY(info.point.x, info.point.y, false);
    }

    return (<>
        <PopoverPrimitive.Root data-slot="popover">
            <PopoverPrimitive.Trigger>
                {/* {getPosProgress && ( */}
                <motion.div
                    className="size-12"
                    onPointerDown={(event) => { stateNapiPosTracker.dragIsRunning = true; dragControls.start(event, { snapToCursor: true }); }}
                    // onPointerDown={() => { napiBuildProgress.dragIsRunning = true; debouncedSetNapiGetPosXY(0, 0); }}
                    // onPointerMove={(event: React.PointerEvent<HTMLDivElement>) => napiBuildProgress.dragIsRunning && debouncedSetNapiGetPosXY(event.pageX, event.pageY)}
                    onPointerUp={() => { stateNapiPosTracker.dragIsRunning = false; }}
                    onDrag={onDrag}
                    drag
                    dragSnapToOrigin
                    dragElastic={0.01}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 50 }}
                    dragControls={dragControls}
                    dragListener={false}
                >
                    123
                </motion.div>

                    <PopoverContent>
                        {/* <PopoverPrimitive.Trigger> */}
                        <IconDndTarget className="size-12 z-1000 absolute top-0 left-0 flex items-center justify-center bg-primary-800 rounded-sm cursor-pointer" />
                        {/* </PopoverPrimitive.Trigger> */}
                    </PopoverContent>

                {/* )} */}
            </PopoverPrimitive.Trigger>
        </PopoverPrimitive.Root>
    </>);
}
