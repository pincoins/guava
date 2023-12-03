import ReactMarkdown from 'react-markdown';

const Terms = () => {
  const markdown = '# 헤딩';

  return <ReactMarkdown className="prose">{markdown}</ReactMarkdown>;
};

export default Terms;
