import { AppHeader } from './components/AppHeader';
import { NodeToolbar } from './components/NodeToolbar';
import { PipelineUI } from './ui';
import { StatusBar } from './components/StatusBar';
import './styles/app.css';
import './styles/nodes.css';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <NodeToolbar />
      <main className="app-workspace">
        <PipelineUI />
        <StatusBar />
      </main>
    </div>
  );
}

export default App;
