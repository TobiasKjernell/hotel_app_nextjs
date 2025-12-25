'use client'

import { useOptimistic } from 'react'
import { deleteReservation } from '../_lib/actions';
import ReservationCard from './ReservationCard';

const ReservationList = ({ bookings }) => {
    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
        return curBookings.filter(booking => booking.id !== bookingId)
    });

    const handleDelete = async (bookingId) => {
        optimisticDelete(bookingId)
        deleteReservation(bookingId);
    }
    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
            ))}
        </ul>
    )
}

export default ReservationList;