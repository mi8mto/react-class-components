import Link from 'next/link';

export const AboutPage = () => {
  return (
    <main>
      <h1>About</h1>
      <p>Author: Ihar Manakhau</p>
      <p>This application was created as part of the RS School React course.</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        RS School React Course
      </a>
      <br />
      <Link href="/?page=1">Back to main page</Link>
    </main>
  );
};
