import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ExternalLink } from "lucide-react";

export const CommunityQR = () => {
  const communityUrl = "https://t.me/clear_a1r";

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-bold">Join Community Chat</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-card rounded-lg border-2 border-primary/20">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://t.me/clear_a1r"
            alt="Community QR Code"
            className="w-48 h-48"
          />
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Scan to join our community chat and coordinate clean-up events
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(communityUrl, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Community Chat
          </Button>
        </div>

        <div className="w-full p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-center">
            💬 Connect with fellow workers, share best practices, and stay updated on compliance requirements
          </p>
        </div>
      </div>
    </Card>
  );
};
