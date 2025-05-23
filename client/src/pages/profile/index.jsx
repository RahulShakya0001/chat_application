import { useAppStore } from "@/store"

const Profile = () => {
    const {userInfo} = useAppStore()
    return (
        <div>Profile
            Email: {userInfo.userId}
        </div>
    )
}

export default Profile

