import { Coor } from './types';
/**
 * Returns the coordinates of the mouse/finger based on the event type.
 *
 * @param e Mouse or touch event
 * @returns The position as `Coor`
 */
export declare const getClientPointerPos: (e: MouseEvent | TouchEvent) => Coor;
