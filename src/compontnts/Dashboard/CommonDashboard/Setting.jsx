
import UpdatePassword from './UpdatePassword';
import UpdateProfilePicture from './UpdateProfilePicture';
import UpdatAdditionalInfo from './UpdatAdditionalInfo';


function Setting() {
  return (
    <div>
      <UpdateProfilePicture/>
      <UpdatAdditionalInfo/>
      <UpdatePassword />
    </div>
  );
}

export default Setting;
