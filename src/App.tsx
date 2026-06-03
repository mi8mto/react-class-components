import { useState } from 'react';
import { Modal } from './components/Modal/Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <h2>Hello Modal</h2>
      </Modal>
    </>
  );
}

export default App;