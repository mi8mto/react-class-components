import { ReactHookForm } from './forms/ReactHookForm';
import { UncontrolledForm } from './forms/UncontrolledForm';

function App() {
  return (
    <>
      <h1>React Hook Form</h1>
      <ReactHookForm />

      <hr />

      <h1>Uncontrolled Form</h1>
      <UncontrolledForm />
    </>
  );
}

export default App;
