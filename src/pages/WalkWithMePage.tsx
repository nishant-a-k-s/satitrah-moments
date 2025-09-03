import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import WalkWithMe from "@/components/WalkWithMe";
import AgentConsole from "@/components/AgentConsole";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";

const WalkWithMePage = () => {
  const { user } = useSimpleAuth();
  const [activeTab, setActiveTab] = useState("user");

  // Check if user is an agent (simple check - in production would be role-based)
  const isAgent = user?.full_name?.toLowerCase().includes('agent');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Walk With Me</h1>
          <p className="text-muted-foreground">
            Production-ready safety feature with real-time monitoring and emergency SOS
          </p>
        </div>

        {isAgent ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User Interface</TabsTrigger>
              <TabsTrigger value="agent">Agent Console</TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="space-y-6">
              <WalkWithMe />
            </TabsContent>

            <TabsContent value="agent" className="space-y-6">
              <AgentConsole />
            </TabsContent>
          </Tabs>
        ) : (
          <WalkWithMe />
        )}

        {/* Technical Information Card */}
        <Card className="p-6 bg-muted/30">
          <h3 className="text-lg font-semibold mb-4">Implementation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-primary mb-2">🛡️ Security & Privacy</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• End-to-end encryption</li>
                <li>• GDPR compliant consent</li>
                <li>• 30-day retention policy</li>
                <li>• EXIF data removal</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-primary mb-2">📱 Mobile Features</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Background location tracking</li>
                <li>• Battery optimization</li>
                <li>• Offline resilience</li>
                <li>• Real-time heartbeat</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-primary mb-2">🚨 Emergency Response</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Risk-based escalation</li>
                <li>• Agent voice bridge</li>
                <li>• Police integration</li>
                <li>• Media capture on SOS</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-primary mb-2">🤖 AI & Analytics</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Misuse detection</li>
                <li>• Risk scoring (9 factors)</li>
                <li>• Pattern recognition</li>
                <li>• Sentiment analysis ready</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-primary mb-2">🏢 Agent Tools</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Real-time dashboard</li>
                <li>• Action audit logs</li>
                <li>• Media review panel</li>
                <li>• Escalation controls</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-primary mb-2">⚡ Infrastructure</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Supabase real-time</li>
                <li>• Edge functions</li>
                <li>• RLS security</li>
                <li>• Production ready</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* API Documentation Card */}
        <Card className="p-6 bg-muted/20">
          <h3 className="text-lg font-semibold mb-4">API Endpoints</h3>
          <div className="space-y-3 text-sm font-mono">
            <div className="flex items-center gap-4">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
              <span>/walk-with-me-api/sessions</span>
              <span className="text-muted-foreground">Create walk session</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">PUT</span>
              <span>/walk-with-me-api/sessions/:id</span>
              <span className="text-muted-foreground">Update session status</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
              <span>/walk-with-me-api/heartbeat</span>
              <span className="text-muted-foreground">Send location heartbeat</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">POST</span>
              <span>/walk-with-me-api/sos</span>
              <span className="text-muted-foreground">Trigger SOS event</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
              <span>/walk-with-me-api/consent</span>
              <span className="text-muted-foreground">Update consent preferences</span>
            </div>
          </div>
        </Card>

        {/* Risk Scoring Formula */}
        <Card className="p-6 bg-primary/5">
          <h3 className="text-lg font-semibold mb-4">Risk Scoring Formula</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Factors & Weights:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Night-time (21:00–05:00): <strong>+2</strong></li>
              <li>• SOS triggered: <strong>+5</strong></li>
              <li>• Location in high-crime area: <strong>+3</strong></li>
              <li>• Phone offline after SOS: <strong>+4</strong></li>
              <li>• User flagged for past incidents: <strong>+3</strong></li>
              <li>• Repeated SOS (≥3 in 24h): <strong>+2</strong></li>
            </ul>
            <p className="mt-3"><strong>Thresholds:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Score ≤ 4: <span className="text-green-600">Normal</span> (optional agent monitoring)</li>
              <li>• Score 5-8: <span className="text-yellow-600">Elevated</span> (auto-assign agent)</li>
              <li>• Score ≥ 9: <span className="text-red-600">High</span> (auto-escalate to police if unresponsive)</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WalkWithMePage;