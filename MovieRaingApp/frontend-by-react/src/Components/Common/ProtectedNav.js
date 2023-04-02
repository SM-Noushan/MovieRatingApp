const ProtectedNav = ({isLoggedIn, children}) => {
  // console.log('navprotection');
  if(isLoggedIn){
      return children;
    }
  return null;
}
export default ProtectedNav