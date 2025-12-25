'use server'

import { revalidatePath } from "next/cache"
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase/supabase"
import { getBookings } from "./data-service"
import { redirect } from "next/navigation"

export const signInAction = async () => {
    await signIn('google', { redirectTo: '/account' })
}

export const signOutAction = async () => {
    await signOut({ redirectTo: '/' });
}

export const updateGuest = async (formData) => {
    const session = await auth();
    if (!session) throw new Error('You must be logged in!')

    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');

    if (!isValidNationalID(nationalID)) throw new Error('Please provide a valid national ID')

    const updateData = { nationality, countryFlag, nationalID }

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId);

    if (error) {
        console.error(error);
        throw new Error('Guest could not be updated');
    }

    revalidatePath('/account/profile')
}

export const updateBooking = async (formData) => {
    const session = await auth();
    if (!session) throw new Error('You must be logged in!')

    const guestbookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestbookings.map(item => item.id);
    const bookingId = Number(formData.get('bookingId'))

    if (!guestBookingsIds.includes(bookingId)) throw new Error('You are not allowed to update this booking')

    const updateData = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000)
    }


    const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }
    revalidatePath('/account/reservations')
    revalidatePath(`/account/reservations/edit/${bookingId}`)   
    redirect('/account/reservations')
}

export const deleteReservation = async (bookingId) => {
    const session = await auth();
    if (!session) throw new Error('You must be logged in!')

    const guestbookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestbookings.map(item => item.id);

    if (!guestBookingsIds.includes(bookingId)) throw new Error('You are not allowed to delete this booking')

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error)
        throw new Error('Booking could not be deleted');

    revalidatePath('/account/reservations')
}

function isValidNationalID(nationalID) {
    const regex = /^[A-Za-z0-9]{6,12}$/;
    return regex.test(nationalID);
}