import ReservationsList from '@/app/_components/ReservationsList';
import { auth } from '@/app/_lib/auth';
import { getBookings } from '@/app/_lib/data-service';

export const metadata = {
  title: 'Reservations',
};

export default async function Page() {
  const sessing = await auth();
  const bookings = await getBookings(sessing.user.guestId);

  return (
    <div>
      <h2 className='mb-7 text-2xl font-semibold text-accent-400'>Your reservations</h2>

      {bookings.length === 0 ? (
        <p className='text-lg'>
          You have no reservations yet. Check out our{' '}
          <a className='text-accent-500 underline' href='/cabins'>
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationsList bookings={bookings} />
      )}
    </div>
  );
}