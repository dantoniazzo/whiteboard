import { Editor } from '_widgets/Editor';
import { LeftRail } from '_widgets/LeftRail';

function App() {
  return (
    <div className="w-screen h-screen bg-gray-900">
      <LeftRail />
      <Editor />
    </div>
  );
}

export default App;
