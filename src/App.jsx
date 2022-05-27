import { useEffect, useRef, useState, forwardRef } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";

import './App.css'

const droppableVariant = {
  dragging: {
    borderColor: "rgb(51, 51, 51)",
    backgroundColor: "#f0f8ff",
  },
  hovering: {
    borderColor: "rgb(93, 100, 177)",
    backgroundColor: "#c3daf0",
  },
  inactive: {
    borderColor: "rgb(128, 128, 128)",
    backgroundColor: "#ffffff",
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
  ({ index, activeIndex, hoverIndex, onDragStart, onDragEnd, onDrag, isDragging }, ref) => {
    return (
      <motion.div
        className="Droppable"
        ref={ref}
        id={index}
        variants={droppableVariant}
        animate={isDragging ? hoverIndex === index ? "hovering" : "dragging" : "inactive"}
      >
        {`Area ${index + 1}`}
        {activeIndex === index && (
          <motion.div
            className="Draggable"
            variants={draggableVariant}
            animate={isDragging ? "dragging" : "inactive"}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrag={onDrag}
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

  const droppables = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  const [activeIndex, setActiveIndex] = useState(droppables.length - 1);
  const [hoverIndex, setHoverIndex] = useState();
  const [isDragging, setIsDragging] = useState(false);

  const getActiveCellIndex = ({ point }) => {
    return droppables.findIndex((cell) => {
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
  };

  const dragStart = () => {
    setIsDragging(true);
  };

  const dragEnd = (_, info) => {
    setIsDragging(false);
    setActiveIndex(prev => {
      const index = getActiveCellIndex(info);

      return index === -1 ? prev : index;
    });
  };

  const onDrag = (_, info) => {
    setHoverIndex(getActiveCellIndex(info));
  }

  return (
    <div className="App" ref={appRef}>
      <AnimateSharedLayout>
        <div className="Droppables">
          {droppables.map((droppable, i) => (
            <Droppable
              index={i}
              key={`droppable-${i}`}
              activeIndex={activeIndex}
              hoverIndex={hoverIndex}
              onDragStart={dragStart}
              onDragEnd={dragEnd}
              onDrag={onDrag}
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
