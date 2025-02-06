import { useState, useRef, useCallback } from "react"
import { useDrag, useDrop } from "react-dnd"
import { ItemTypes } from "./ItemTypes"
import Confetti from "react-confetti"
import Popup from "./Popup"

const App = () => {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [dragY, setDragY] = useState(useRef(0))

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => {},
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const handleDrag = useCallback((e) => {
    setDragY(e.pageY)
  }, [])

  const handleDragEnd = () => {
    if (dragY.current > 150) {
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
        setTimeout(() => {
          setShowPopup(true)
        }, 2000)
      }, 2000)
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      {showConfetti && <Confetti />}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <div
        ref={drop}
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          ref={drag}
          style={{
            backgroundColor: isDragging ? "lightgreen" : "lightblue",
            padding: "20px",
            cursor: "move",
            opacity: isDragging ? 0.5 : 1,
            border: isOver ? "2px solid green" : "1px solid black",
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          Drag me!
        </div>
      </div>
    </div>
  )
}

export default App

