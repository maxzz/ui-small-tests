import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { stateNapiPosTracker } from "./9-types";

export function PositionIndicator(props: ComponentPropsWithoutRef<"div">) {
    const { current, dragIsRunning } = useSnapshot(stateNapiPosTracker);
    return (<>
        {dragIsRunning && (
            <div {...props}>
                {current.x}, {current.y}
            </div>
        )}
    </>);
}
