import { useRef, useState, forwardRef } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";

import './App.css'

const droppableVariant = {
  dragging: {
    borderColor: "rgb(51, 51, 51)",
    backgroundColor: "aliceblue",
  },
  inactive: {
    borderColor: "rgb(128, 128, 128)",
    backgroundColor: "inherit",
  }
};

const draggableVariant = {
  dragging: {
    scale: 1.1,
    borderColor: "rgb(51, 51, 51)",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.05)",
  },
  inactive: {
    scale: 1,
    borderColor: "rgb(179, 179, 179)",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0)",
  }
};

const Droppable = forwardRef(
  ({ index, activeIndex, onDragStart, onDragEnd, isDragging }, ref) => {
    return (
      <motion.div
        className="Droppable"
        ref={ref}
        id={index}
        variants={droppableVariant}
        animate={isDragging ? "dragging" : "inactive"}
      >
        {`Area ${index + 1}`}
        {activeIndex === index && (
          <motion.div
            className="Draggable"
            variants={draggableVariant}
            animate={isDragging ? "dragging" : "inactive"}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            layoutId="drag"
            drag
            // dragConstraints={constraintRef}
            dragSnapToOrigin
            dragElastic={0.1}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 1.05 }}
          >
            Draggable
          </motion.div>
        )}
      </motion.div>
    );
  }
);

function App() {
  const appRef = useRef(null);
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const droppables = [ref0, ref1, ref2, ref3];

  const [activeIndex, setActiveIndex] = useState(3);
  const [isDragging, setIsDragging] = useState(false);

  const getActiveCellIndex = ({ point }) => {
    const cellIndex = droppables.findIndex((cell) => {
      const {
        offsetLeft,
        offsetTop,
        offsetWidth,
        offsetHeight,
        parentElement
      } = cell.current;

      const leftEdge = parentElement.offsetLeft + offsetLeft;
      const rightEdge = parentElement.offsetLeft + offsetLeft + offsetWidth;
      const topEdge = parentElement.offsetTop + offsetTop;
      const bottomEdge = parentElement.offsetTop + offsetTop + offsetHeight;

      return (
        point.x >= leftEdge &&
        point.x <= rightEdge &&
        point.y >= topEdge &&
        point.y <= bottomEdge
      );
    });

    // cellIndex should be -1 if not dropped into a cell. If that's the case, just return the current activeIndex
    if (cellIndex < 0) return activeIndex;

    return cellIndex;
  };

  const dragStart = () => {
    setIsDragging(true);
  };

  const dragEnd = (_, info) => {
    setIsDragging(false);
    setActiveIndex(getActiveCellIndex(info));
  };

  return (
    <div className="App" ref={appRef}>
      <AnimateSharedLayout>
        <div className="Droppables">
          {droppables.map((droppable, i) => (
            <Droppable
              index={i}
              key={`droppable-${i}`}
              activeIndex={activeIndex}
              onDragStart={dragStart}
              onDragEnd={dragEnd}
              isDragging={isDragging}
              ref={droppable}
            />
          ))}
        </div>
      </AnimateSharedLayout>
    </div>
  )
}

export default App
