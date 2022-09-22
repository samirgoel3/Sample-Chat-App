import Endpoints from '../../endpoints';
import Client from '../../api-client/';
import Storage from '../../../storage';


class AuthenticationService {

    

    getLogin = (email, password) => Client.API_CLIENT.post("" + Endpoints.v1.LGOIN, { email, password })
    getSignUp = (formData) => Client.API_CLIENT.post("" + Endpoints.v1.CREATE_USER, formData)
    getSearchUsers = (key) => Client.API_CLIENT.post("" + Endpoints.v1.SEARCH_USER, {key}, {headers:{"x-access-token":""+Storage.Session.getUserData().token}})
    getAllUsers = () => Client.API_CLIENT.post("" + Endpoints.v1.All_USERS, {},{headers:{"x-access-token":""+Storage.Session.getUserData().token}})





}
export default new AuthenticationService();
