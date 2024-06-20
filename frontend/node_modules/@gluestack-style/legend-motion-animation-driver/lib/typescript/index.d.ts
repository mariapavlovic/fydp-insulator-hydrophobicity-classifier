import type { IAnimationDriverPlugin, IAnimationResolver } from '@gluestack-style/react';
export declare class MotionAnimationDriver implements IAnimationDriverPlugin {
    name: 'MotionAnimationDriver';
    engine: any;
    config: {
        aliases: {
            readonly ':animate': "animate";
            readonly ':initial': "initial";
            readonly ':exit': "exit";
            readonly ':initialProps': "initialProps";
            readonly ':animateProps': "animateProps";
            readonly ':transition': "transition";
            readonly ':transformOrigin': "transformOrigin";
            readonly ':whileTap': "whileTap";
            readonly ':whileHover': "whileHover";
            readonly ':onAnimationComplete': "onAnimationComplete";
        };
    };
    register(config: any): void;
    constructor(config?: IAnimationResolver);
}
//# sourceMappingURL=index.d.ts.map