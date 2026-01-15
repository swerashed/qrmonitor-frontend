"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { editQRCode } from "@/services/QRCodeServices";

interface EditQRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    qrCode: {
        id: string;
        name: string;
        targetUrl: string;
        trackingEnabled: boolean;
    };
    onSuccess: () => void;
}

export function EditQRCodeModal({
    isOpen,
    onClose,
    qrCode,
    onSuccess,
}: EditQRCodeModalProps) {
    const [name, setName] = useState(qrCode.name);
    const [targetUrl, setTargetUrl] = useState(qrCode.targetUrl);
    const [trackingEnabled, setTrackingEnabled] = useState(qrCode.trackingEnabled ?? true);

    useEffect(() => {
        if (isOpen) {
            setName(qrCode.name);
            setTargetUrl(qrCode.targetUrl);
            setTrackingEnabled(qrCode.trackingEnabled ?? true);
        }
    }, [isOpen, qrCode]);

    const mutation = useMutation({
        mutationFn: editQRCode,
        onSuccess: (data) => {
            if (data?.success) {
                toast.success("QR Code updated successfully!");
                onSuccess();
                onClose();
            } else {
                toast.error(data?.message || "Failed to update QR Code");
            }
        },
        onError: (error: any) => {
            toast.error(error?.message || "Something went wrong while updating");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetUrl) {
            toast.error("Target URL is required");
            return;
        }

        mutation.mutate({
            id: qrCode.id,
            name,
            targetUrl,
            trackingEnabled,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit QR Code</DialogTitle>
                        <DialogDescription>
                            Update your QR code's name and destination.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Marketing Campaign"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="targetUrl">Target URL</Label>
                            <Input
                                id="targetUrl"
                                value={targetUrl}
                                onChange={(e) => setTargetUrl(e.target.value)}
                                placeholder="https://example.com"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="tracking">Tracking</Label>
                                <div className="text-sm text-muted-foreground">
                                    Collect scan analytics for this QR
                                </div>
                            </div>
                            <Switch
                                id="tracking"
                                checked={trackingEnabled}
                                onCheckedChange={setTrackingEnabled}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={mutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
