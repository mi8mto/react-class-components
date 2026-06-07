import { useState } from 'react';
import { ReactHookForm } from './forms/ReactHookForm';
import { UncontrolledForm } from './forms/UncontrolledForm';
import { SubmissionsList } from './components/SubmissionsList/SubmissionsList';
import { Modal } from './components/Modal/Modal';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState<
    'react-hook-form' | 'uncontrolled-form' | null
  >(null);

  return (
    <div className="app-container">
      <h1 className="page-title">Modern Design Forms</h1>

      <div className="buttons-container">
        <button onClick={() => setActiveForm('react-hook-form')}>
          Open React Hook Form
        </button>

        <button onClick={() => setActiveForm('uncontrolled-form')}>
          Open Uncontrolled Form
        </button>
      </div>

      <Modal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
        {activeForm === 'react-hook-form' && (
          <ReactHookForm onSuccess={() => setActiveForm(null)} />
        )}
        {activeForm === 'uncontrolled-form' && (
          <UncontrolledForm onSuccess={() => setActiveForm(null)} />
        )}
      </Modal>
      <div className="submissions-wrapper">
        <SubmissionsList />
      </div>
    </div>
  );
}

export default App;
