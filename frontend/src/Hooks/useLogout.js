import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';


export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const {dispatch : workoutsDistpatch} = useWorkoutsContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    workoutsDistpatch({type : 'SET_WORKOUTS', payload : null})
  };

  return { logout };
};