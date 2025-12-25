'use server'

import { revalidatePath } from "next/cache"
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase/supabase"

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

function isValidNationalID(nationalID) {
    const regex = /^[A-Za-z0-9]{6,12}$/;
    return regex.test(nationalID);
}