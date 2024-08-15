import { auth } from '@/app/_lib/auth';

export const metadata = {
  title: 'Account',
};

export default async function page() {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <h2 className='mb-7 text-2xl font-semibold text-accent-400'>Welcome, {session.user.name}</h2>
    </div>
  );
}
