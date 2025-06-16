import { Globe, Laptop, Smartphone, Tablet } from "lucide-react";

 export const getDeviceIcon = (device: string) => {
        switch (device.toLowerCase()) {
            case "mobile":
                return <Smartphone className="h-4 w-4" />;
            case "desktop":
                return <Laptop className="h-4 w-4" />;
            case "tablet":
                return <Tablet className="h-4 w-4" />;
            default:
                return <Globe className="h-4 w-4" />;
        }
    };