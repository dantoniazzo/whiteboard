import { Editor } from '_widgets/Editor';
import { LeftRail } from '_widgets/LeftRail';
import { RightRail } from '_widgets/RightRail';

function App() {
  return (
    <div className="w-screen h-screen bg-gray-900">
      <Editor />
      <LeftRail />
      <RightRail />
    </div>
  );
}

export default App;
