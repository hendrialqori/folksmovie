import axios from "axios";
import API_KEY from '../constant/key'

const lc = (guest_id) => localStorage.setItem('session_guest_id', guest_id)
export const saveIntoLocal = async () => {
    const request_guest_session = await axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`)
    const response = await request_guest_session.data
    const guest_session_id = response?.guest_session_id
    lc(guest_session_id)
}
