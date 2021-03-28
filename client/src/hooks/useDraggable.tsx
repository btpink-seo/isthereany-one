/* eslint-disable no-param-reassign */
import React, { useRef, MutableRefObject } from 'react';

const useDraggable = (
  mainRef: MutableRefObject<HTMLDivElement>,
  movePartRef: MutableRefObject<HTMLDivElement>
) => {
  const newX = useRef(0);
  const newY = useRef(0);
  const baseX = useRef(0);
  const baseY = useRef(0);
  const initialTop = useRef('');
  const initialLeft = useRef('');

  const dragElement = () => {
    initialTop.current = mainRef.current.style.top;
    initialLeft.current = mainRef.current.style.left;
    movePartRef.current.onmousedown = dragMouseDown;
    movePartRef.current.ontouchstart = dragTouchDown;
  };

  const dragMouseDown = (e: MouseEvent) => {
    const event = e || window.event;
    event.preventDefault();
    // get the mouse cursor position at startup:
    baseX.current = event.clientX;
    baseY.current = event.clientY;
    document.onmouseup = closeDragElement;
    // call a const whenever the cursor moves:
    document.onmousemove = elementDragMouse;
  };

  const dragTouchDown = (e: TouchEvent) => {
    // e.preventDefault();
    const event = e.targetTouches[0];
    // get the mouse cursor position at startup:
    baseX.current = event.clientX;
    baseY.current = event.clientY;
    document.ontouchmove = elementDragTouch;
    document.ontouchend = closeDragElement;
  };

  const elementDragMouse = (e: MouseEvent) => {
    e.preventDefault();
    const event = e || window.event;
    calculateCoordinate(event.clientX, event.clientY);
  };

  const elementDragTouch = (e: TouchEvent) => {
    // e.preventDefault();
    const touch = e.targetTouches[0];
    calculateCoordinate(touch.clientX, touch.clientY);
  };

  const calculateCoordinate = (x: number, y: number) => {
    // calculate the new cursor position:
    newX.current = baseX.current - x;
    newY.current = baseY.current - y;
    baseX.current = x;
    baseY.current = y;
    // set the element's new position:
    mainRef.current.style.top = `${mainRef.current.offsetTop - newY.current}px`;
    mainRef.current.style.left = `${mainRef.current.offsetLeft - newX.current}px`;
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchmove = null;
    document.ontouchend = null;
  };

  const setDefault = () => {
    mainRef.current.style.top = initialTop.current;
    mainRef.current.style.left = initialLeft.current;
  };

  return { dragElement, setDefault };
};

export default useDraggable;
