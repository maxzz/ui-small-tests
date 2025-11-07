import { proxy } from "valtio";

// State of napi pos tracker

export type PosTrackerCbType = {
    x: number;
    y: number;
    isInside: boolean;
}

export type StateNapiPosTracker = {
    current: PosTrackerCbType;
    dragIsRunning: boolean;
};

export const stateNapiPosTracker = proxy<StateNapiPosTracker>({
    current: {
        x: 0,
        y: 0,
        isInside: false,
    },
    dragIsRunning: false,
});
