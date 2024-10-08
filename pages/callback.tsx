import axios from 'axios'
import { useEffect } from 'react';

const Callback = () => {

    useEffect(() => {

        const getProfileObject = async (code: string | null) => {
            const response = await axios.post("http://localhost:8888/spotify/auth/callback", {code})
            console.log(response.data.ok);
        }

        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        getProfileObject(code);
    })

    return (
        <div>
            Hello
        </div>
    )
};

export default Callback;