import UserProfile from '../components/UserProfile';

export default function ProfilePage() {
  return (
    <UserProfile
      name="Ali"
      email="aa@gmail.com"
      role="rider"
      rideHistory={[]}
    />
  );
}
