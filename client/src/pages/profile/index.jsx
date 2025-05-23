import { useAppStore } from "@/store"

const Profile = () => {
    const {userInfo} = useAppStore()
    return (
        <div>Profile
            Email: {userInfo.email}
        </div>
    )
}

export default Profile

