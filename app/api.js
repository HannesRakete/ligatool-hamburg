import { create } from 'apisauce';
export const baseUrl = 'https://kickern-hamburg.de/de/competitions';
// export const baseUrl = 'https://dev.kickern-hh.de/de/competitions';

const api = create({
    baseURL: `${baseUrl}/index.php?option=com_sportsmanagerapi&q=`
});

if (__DEV__) {
    api.addMonitor(response => {
        console.tron.apisauce(response);
    });
}

export default api;