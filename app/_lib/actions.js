'use server';

import { auth, signIn, signOut } from '@/app/_lib/auth';
import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateGuestProfile(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('Please provide a valid national ID');

  const updateData = { nationality, countryFlag, nationalID };
  const { error } = await supabase.from('guests').update(updateData).eq('id', session?.user?.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map(el => el.id);

  if (!guestBookingIds.includes(bookingId)) throw new Error('Your are not allowed to delete this booking');

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  //--- 1. AUTHENTICATION ---//
  const session = await auth();
  if (!session) throw new Error('You must bo logged in');

  //--- 2. AUTHORIZATION ---//
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map(el => el.id);

  const bookingId = +formData.get('bookingId');
  if (!guestBookingIds.includes(bookingId)) throw new Error('Your are not allowed to edit this booking');

  //--- 3. BUILDING UPDATE DATA ---//
  const updateData = {
    numGuests: +formData.get('numGuests'),
    observations: formData.get('observations').slice(0, 1000),
  };

  //--- 4. MUTATION ---//
  const { error } = await supabase.from('bookings').update(updateData).eq('id', bookingId);

  //--- 5. ERROR HANDLING ---//
  if (error) {
    console.error(error);
    throw new Error('Booking could not be edited');
  }

  //--- 6. REVALIDATION ---//
  revalidatePath(`/account/reservations`);
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  //--- 7. REDIRECTING ---//
  redirect('/account/reservations');
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);
  if (error) {
    console.log(error);
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/cabins/thankyou');
}
