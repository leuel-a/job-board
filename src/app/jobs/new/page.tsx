import { Metadata } from 'next';
import NewJobForm from './components/NewJobForm';

export const metadata: Metadata = {
  title: 'Post a new job',
};

export default function Page() {
  return <NewJobForm />;
}
