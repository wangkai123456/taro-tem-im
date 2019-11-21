export type AnimationSegment = [number, number];
export type AnimationEventName = 'enterFrame' | 'loopComplete' | 'complete' | 'segmentStart' | 'destroy' | 'config_ready' | 'data_ready' | 'DOMLoaded' | 'error';
export type AnimationDirection = 1 | -1;
export type AnimationEventCallback<T = any> = (args: T) => void;

/**
 * 具体api查看 https://github.com/airbnb/lottie-web
 *
 * @export
 * @interface AnimationItem
 */
export interface AnimationItem {
    play(): void;
    stop(): void;
    pause(): void;
    resize(): void;
    setLocationHref(href: string): void;
    setSpeed(speed: number): void;
    goToAndPlay(value: number, isFrame?: boolean): void;
    goToAndStop(value: number, isFrame?: boolean): void;
    setDirection(direction: AnimationDirection): void;
    playSegments(segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean): void;
    setSubframe(useSubFrames: boolean): void;
    destroy(): void;
    getDuration(inFrames?: boolean): number;
    triggerEvent<T = any>(name: AnimationEventName, args: T): void;
    addEventListener<T = any>(name: AnimationEventName, callback: AnimationEventCallback<T>): void;
    removeEventListener<T = any>(name: AnimationEventName, callback: AnimationEventCallback<T>): void;
}
