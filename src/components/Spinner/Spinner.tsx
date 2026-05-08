import './Spinner.css';

export const Spinner = () => {
  return (
    <div className="spinner-container" role="status" aria-label="loading">
      <div className="spinner" />
    </div>
  );
};
