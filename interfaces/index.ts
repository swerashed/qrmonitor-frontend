export interface DashboardStats {
    totalQRCodes: {
        count: number;
        diff: number;
    };
    totalScans: {
        count: number;
        diffPercentage: number;
    };
    uniqueVisitors: {
        count: number;
        diffPercentage: number;
    };
    scansLast7Days: {
        count: number;
        diffPercentage: number;
    };
    scanActivity: {
        date: string; // YYYY-MM-DD
        scans: number;
    }[];
    recentScans: RecentScan[];
    topQRCodes: {
        id: string;
        name: string;
        totalScans: number;
    }[];
    scanByDevice: ScanByDevice[];
    scanByLocation: ScanByLocation[];
}


export interface QRCodeData {
    id: string;
    name: string;
    description?: string;
    targetUrl: string;
    totalScans: number;
    uniqueScans: number;
    lastScans: string | Date;
    createdAt: string | Date;
    trackingEnabled: boolean;
    settings: Record<string, unknown> | null;
    totalEdits: number;
    updatedAt: Date;
    creatorId: string;
}

export interface ScanByDevice {
    device: string;
    count: number;
    percentage: number;
}

export interface ScanByLocation {
    country: string;
    count: number;
    percentage: number;
}

export interface RecentScan {
    id: string;
    location: string;
    device: string;
    timestamp: string | Date;
}
export interface ScanOverTime {
    scans: number;
    hour: string | Date;
}
export interface ScanOverDay {
    scans: number;
    date: string | Date;
}
export interface CreateQrCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface DashboardStatsProps {
    title: string
    value: string
    description: string
    icon: React.ReactNode
  }
  
