import { useEffect, useState } from 'react';
import { useFormStore } from '../../store/formStore';

export const SubmissionsList = () => {
  const submissions = useFormStore((state) => state.submissions);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="submissions-section">
      <h2 className="card-title" style={{ fontSize: '1.25rem' }}>
        Submissions
      </h2>

      {submissions.length === 0 ? (
        <p className="no-submissions">No submissions yet</p>
      ) : (
        submissions.map((submission) => {
          const isNew = now - new Date(submission.createdAt).getTime() < 5000;

          return (
            <div
              key={submission.id}
              className={`submission-card ${isNew ? 'new-submission' : ''}`}
            >
              {submission.image && (
                <img
                  className="submission-avatar"
                  src={submission.image}
                  alt={submission.fullName}
                />
              )}

              <div className="submission-info">
                <h3>{submission.fullName}</h3>

                <p>{submission.email}</p>

                <small>
                  {new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(submission.createdAt))}
                </small>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
