
import './App.css'

const Draggable = () => {
  return (
    <div className="Draggable">
      Draggable
    </div>
  )
};

const Droppable = () => {
  return (
    <div className="Droppable">
      Droppable
    </div>
  )
};

const draggableIds = ["Draggable1", "Draggable2", "Draggable3"];
const droppableIds = ["Droppable1", "Droppable2", "Droppable3"];


function App() {
  return (
    <div className="App">
      <div className="Droppables">
        {droppableIds.map(id => <Droppable key={id} id={id} />)}
      </div>
      <div className="Draggables">
        {draggableIds.map(id => <Draggable key={id} id={id} />)}
      </div>
    </div>
  )
}

export default App
