import { ReactHookForm } from './forms/ReactHookForm';
import { UncontrolledForm } from './forms/UncontrolledForm';
import { SubmissionsList } from './components/SubmissionsList/SubmissionsList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="page-title">Modern Design Forms</h1>
      <div className="forms-container">
        <ReactHookForm />
        <UncontrolledForm />
      </div>
      <div className="submissions-wrapper">
        <SubmissionsList />
      </div>
    </div>
  );
}

export default App;
