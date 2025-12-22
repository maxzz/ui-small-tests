// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useAnimatedState.tsx
import { useEffect } from "react";
// import { useDeprecatedAnimatedState } from "motion/react"

/**
 * An example of useAnimatedState. This isn't a supported API and this example is only for development purposes.
 */

export function HooksUseAnimatedStateDemo() {
    /*
    const [state, animate] = useDeprecatedAnimatedState({
        foo: 0,
    })
    console.log(state.foo)
    useEffect(() => {
        animate({ foo: 100 }, { duration: 3 })
    }, [])

    return <div style={{ color: "white" }}>{state.foo}</div>
    */
   return <div className="text-white p-10">This example uses useDeprecatedAnimatedState which is not available in the public API.</div>
}

