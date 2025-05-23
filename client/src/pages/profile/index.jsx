import { useAppStore } from "@/store"

const Profile = () => {
    const {userInfo} = useAppStore()
    return (
        <div>Profile
            Email: {userInfo.email}
            <br />
            Id: {userInfo.id}
        </div>
    )
}

export default Profile

