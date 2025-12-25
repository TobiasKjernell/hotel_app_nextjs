import LoginMessage from "@/starter/components/LoginMessage";
import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

const Reservation = async ({ cabin }) => {
    const sessions = await auth();
    const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)])
    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
           {sessions?.user ? <ReservationForm cabin={cabin} user={sessions.user} />
           : <LoginMessage />}
        </div>
    )
}

export default Reservation; 