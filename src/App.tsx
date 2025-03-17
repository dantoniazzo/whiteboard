import { Editor } from "_widgets/Editor";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-mono text-white m-8 tracking-wider">
          Vector AI
        </h1>
        <div className="bg-gray-800 w-fit h-fit rounded-lg shadow-lg border border-purple-700 shadow-purple-950/50">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default App;
