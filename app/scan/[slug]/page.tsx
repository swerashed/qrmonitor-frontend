import { ScanQRCode } from "@/services/QRCodeServices";
import { redirect } from "next/navigation";

const ScanPage = async ({ params }: { params: { slug: string } }) => {
  const slug = (await params).slug;
  const scanResponse = await ScanQRCode({ slug });

  const redirectLink = scanResponse?.data?.link;

  if (!redirectLink) {
    // Optional: Show error page or a fallback message
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <p className="text-red-600 font-semibold text-lg">
          Invalid QR code or destination not found.
        </p>
      </div>
    );
  }

  // Perform the redirect
  redirect(redirectLink);
};

export default ScanPage;
