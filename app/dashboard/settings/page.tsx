import SettingsPage from "@/components/pages/dashboard-settings-page";
import { getUserProfile } from "@/services/UserServices";

export default async function SettingsPageDashboard() {
  
  const userProfile = await getUserProfile()
  const data = userProfile?.data
  await new Promise(resolve => setTimeout(resolve, 2000))

  return (
   <SettingsPage data={data}/>
  )
}
