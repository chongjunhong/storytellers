import {useEffect} from 'react';
import {Auth} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {setAuthor} from '../../redux/author';
import getUserDetailsFromAmplify from '../users/get-user-details-from-amplify';

export default function useCheckLogin(shouldRedirectWhenError) {
    const dispatch = useDispatch(setAuthor());
    const history = useHistory();

    useEffect(() => {
        const fetchSession = async () => {
          try {
           await Auth.currentSession();
           const user = await Auth.currentAuthenticatedUser();
           
           dispatch(setAuthor(getUserDetailsFromAmplify(user))); 
          } catch (e){
            if (shouldRedirectWhenError) {
              history.push('/login');
            }
          };
        }
    
        fetchSession();
    }, [shouldRedirectWhenError]);
}