import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDashboardStats } from "@/services/QRCodeServices";
import LandingPage from "@/components/pages/landing-page";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    try {
      const statsResponse = await getDashboardStats();
      if (statsResponse?.success) {
        const qrCount = statsResponse?.data?.totalQRCodes?.count;
        if (qrCount === 0) {
          redirect("/dashboard/qr-codes/create");
        } else {
          redirect("/dashboard");
        }
      }
    } catch (error: any) {
      // Next.js redirect throws an error that should not be caught
      if (error && error.digest && error.digest.startsWith("NEXT_REDIRECT")) {
        throw error;
      }
      console.error("Redirect check failed:", error);
    }
  }

  return <LandingPage />;
}
