import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, AlertTriangle, Camera, Mic, Clock, User, Shield, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SOSEvent {
  id: string;
  user_id: string;
  status: string;
  risk_score: number;
  location: any;
  created_at: string;
  walk_session_id: string;
  agent_id?: string;
  metadata: any;
}

interface MediaFile {
  id: string;
  file_type: string;
  file_path: string;
  sequence_number: number;
  uploaded_at: string;
}

const AgentConsole = () => {
  const { toast } = useToast();
  
  // State management
  const [sosEvents, setSOSEvents] = useState<SOSEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<SOSEvent | null>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    type: string;
    title: string;
  }>({ open: false, type: '', title: '' });
  const [actionReason, setActionReason] = useState('');
  const [agentId] = useState('agent-demo-001'); // In production, get from auth

  useEffect(() => {
    loadSOSEvents();
    setupRealtimeSubscription();
  }, []);

  const loadSOSEvents = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('sos_events')
        .select(`
          *,
          profiles!inner(full_name, mobile_number)
        `)
        .in('status', ['open', 'acknowledged_by_agent', 'in_conference'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSOSEvents(data || []);
    } catch (error) {
      console.error('Error loading SOS events:', error);
      toast({
        title: "Error",
        description: "Failed to load SOS events.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('agent-alerts')
      .on('broadcast', { event: 'sos-created' }, (payload) => {
        console.log('New SOS event received:', payload);
        loadSOSEvents(); // Refresh the list
        
        toast({
          title: "New SOS Alert",
          description: `Emergency alert from user at risk level ${payload.payload.risk_score}`,
          variant: "destructive"
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const selectEvent = async (event: SOSEvent) => {
    setSelectedEvent(event);
    
    // Load media files for this event
    try {
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .eq('sos_event_id', event.id)
        .order('sequence_number');

      if (error) throw error;
      setMediaFiles(data || []);
      
      // Log agent action
      await logAgentAction(event.id, 'view_event', { event_selected: true });
      
    } catch (error) {
      console.error('Error loading media files:', error);
    }
  };

  const logAgentAction = async (sosEventId: string, actionType: string, details: any = {}, reason?: string) => {
    try {
      await supabase
        .from('agent_actions')
        .insert({
          agent_id: agentId,
          sos_event_id: sosEventId,
          action_type: actionType,
          action_details: details,
          reason: reason || null
        });
    } catch (error) {
      console.error('Error logging agent action:', error);
    }
  };

  const handleAgentAction = async (actionType: string, reason?: string) => {
    if (!selectedEvent) return;

    try {
      let updateData: any = {};
      let details: any = {};

      switch (actionType) {
        case 'acknowledge':
          updateData = { 
            status: 'acknowledged_by_agent',
            agent_id: agentId 
          };
          break;
          
        case 'start_conference':
          updateData = { status: 'in_conference' };
          details = { conference_started: true };
          break;
          
        case 'escalate_contacts':
          details = { escalated_to: 'emergency_contacts' };
          await createEscalationRecord('contacts');
          break;
          
        case 'escalate_police':
          details = { escalated_to: 'police' };
          await createEscalationRecord('police');
          break;
          
        case 'mark_misuse':
          await supabase
            .from('misuse_flags')
            .insert({
              user_id: selectedEvent.user_id,
              flag_type: 'false_alarms',
              notes: reason
            });
          updateData = { status: 'misuse_flagged' };
          break;
          
        case 'close_event':
          updateData = { 
            status: 'closed',
            closed_at: new Date().toISOString()
          };
          break;
      }

      // Update SOS event if needed
      if (Object.keys(updateData).length > 0) {
        const { error } = await supabase
          .from('sos_events')
          .update(updateData)
          .eq('id', selectedEvent.id);

        if (error) throw error;
      }

      // Log the action
      await logAgentAction(selectedEvent.id, actionType, details, reason);

      // Refresh data
      await loadSOSEvents();
      if (selectedEvent) {
        const updatedEvent = { ...selectedEvent, ...updateData };
        setSelectedEvent(updatedEvent);
      }

      setActionDialog({ open: false, type: '', title: '' });
      setActionReason('');

      toast({
        title: "Action completed",
        description: `Successfully executed ${actionType.replace('_', ' ')}.`
      });

    } catch (error) {
      console.error('Error executing agent action:', error);
      toast({
        title: "Error",
        description: "Failed to execute action.",
        variant: "destructive"
      });
    }
  };

  const createEscalationRecord = async (escalationType: 'contacts' | 'police') => {
    if (!selectedEvent) return;

    const recipientInfo = {
      escalation_type: escalationType,
      sos_event_id: selectedEvent.id,
      location: selectedEvent.location,
      timestamp: new Date().toISOString()
    };

    await supabase
      .from('escalation_records')
      .insert({
        sos_event_id: selectedEvent.id,
        escalation_type: escalationType,
        escalation_status: 'sent',
        recipient_info: recipientInfo,
        agent_id: agentId
      });
  };

  const openActionDialog = (type: string, title: string) => {
    setActionDialog({ open: true, type, title });
    setActionReason('');
  };

  const getRiskColor = (score: number) => {
    if (score <= 4) return 'bg-green-500';
    if (score <= 8) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskLevel = (score: number) => {
    if (score <= 4) return 'Normal';
    if (score <= 8) return 'Elevated';
    return 'High';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500';
      case 'acknowledged_by_agent': return 'bg-yellow-500';
      case 'in_conference': return 'bg-blue-500';
      case 'closed': return 'bg-green-500';
      case 'misuse_flagged': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Loading agent console...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Agent Console</h1>
        <Badge className="bg-primary text-white">
          Agent: {agentId}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOS Events List */}
        <Card className="lg:col-span-1 p-4">
          <h2 className="text-xl font-semibold mb-4">Active SOS Events ({sosEvents.length})</h2>
          <div className="space-y-3">
            {sosEvents.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No active SOS events</p>
            ) : (
              sosEvents.map((event) => (
                <Card 
                  key={event.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    selectedEvent?.id === event.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => selectEvent(event)}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge className={`${getRiskColor(event.risk_score)} text-white text-xs`}>
                        {getRiskLevel(event.risk_score)} ({event.risk_score})
                      </Badge>
                      <Badge className={`${getStatusColor(event.status)} text-white text-xs`}>
                        {event.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="text-sm">
                      <p className="font-medium">User: {event.user_id}</p>
                      <p className="text-muted-foreground">
                        {new Date(event.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {event.location.latitude?.toFixed(4)}, {event.location.longitude?.toFixed(4)}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>

        {/* Event Details */}
        <Card className="lg:col-span-2 p-4">
          {!selectedEvent ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select an SOS event to view details</p>
            </div>
          ) : (
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Event Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">ID:</span> {selectedEvent.id}</p>
                      <p><span className="text-muted-foreground">User:</span> {selectedEvent.user_id}</p>
                      <p><span className="text-muted-foreground">Status:</span> 
                        <Badge className={`${getStatusColor(selectedEvent.status)} text-white ml-2`}>
                          {selectedEvent.status.replace('_', ' ')}
                        </Badge>
                      </p>
                      <p><span className="text-muted-foreground">Risk Score:</span> 
                        <Badge className={`${getRiskColor(selectedEvent.risk_score)} text-white ml-2`}>
                          {selectedEvent.risk_score} ({getRiskLevel(selectedEvent.risk_score)})
                        </Badge>
                      </p>
                      <p><span className="text-muted-foreground">Created:</span> {new Date(selectedEvent.created_at).toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    {selectedEvent.location ? (
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Latitude:</span> {selectedEvent.location.latitude}</p>
                        <p><span className="text-muted-foreground">Longitude:</span> {selectedEvent.location.longitude}</p>
                        {selectedEvent.location.accuracy && (
                          <p><span className="text-muted-foreground">Accuracy:</span> {selectedEvent.location.accuracy}m</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No location data</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <h3 className="font-semibold">Media Files ({mediaFiles.length})</h3>
                {mediaFiles.length === 0 ? (
                  <p className="text-muted-foreground">No media files available</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {mediaFiles.map((file) => (
                      <Card key={file.id} className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          {file.file_type === 'image' ? (
                            <Camera className="h-4 w-4" />
                          ) : (
                            <Mic className="h-4 w-4" />
                          )}
                          <span className="font-medium capitalize">{file.file_type}</span>
                          <Badge variant="outline">#{file.sequence_number}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(file.uploaded_at).toLocaleString()}
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          View {file.file_type}
                        </Button>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <h3 className="font-semibold mb-4">Agent Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedEvent.status === 'open' && (
                    <Button 
                      variant="default"
                      onClick={() => handleAgentAction('acknowledge')}
                      className="h-auto p-4 flex flex-col items-center"
                    >
                      <User className="h-6 w-6 mb-2" />
                      Acknowledge & Assign
                    </Button>
                  )}
                  
                  {selectedEvent.status === 'acknowledged_by_agent' && (
                    <Button 
                      variant="default"
                      onClick={() => handleAgentAction('start_conference')}
                      className="h-auto p-4 flex flex-col items-center"
                    >
                      <Volume2 className="h-6 w-6 mb-2" />
                      Start Voice Bridge
                    </Button>
                  )}

                  <Button 
                    variant="outline"
                    onClick={() => openActionDialog('escalate_contacts', 'Escalate to Emergency Contacts')}
                    className="h-auto p-4 flex flex-col items-center"
                  >
                    <Phone className="h-6 w-6 mb-2" />
                    Notify Contacts
                  </Button>

                  <Button 
                    variant="destructive"
                    onClick={() => openActionDialog('escalate_police', 'Escalate to Police')}
                    className="h-auto p-4 flex flex-col items-center"
                  >
                    <Shield className="h-6 w-6 mb-2" />
                    Escalate to Police
                  </Button>

                  <Button 
                    variant="secondary"
                    onClick={() => openActionDialog('mark_misuse', 'Mark as Misuse')}
                    className="h-auto p-4 flex flex-col items-center"
                  >
                    <AlertTriangle className="h-6 w-6 mb-2" />
                    Mark Misuse
                  </Button>

                  <Button 
                    variant="outline"
                    onClick={() => openActionDialog('close_event', 'Close Event')}
                    className="h-auto p-4 flex flex-col items-center"
                  >
                    <Clock className="h-6 w-6 mb-2" />
                    Close Event
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <h3 className="font-semibold">Agent Action History</h3>
                <p className="text-muted-foreground">Action history would be displayed here</p>
              </TabsContent>
            </Tabs>
          )}
        </Card>
      </div>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog(prev => ({ ...prev, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionDialog.title}</DialogTitle>
            <DialogDescription>
              Please provide a reason for this action (optional for most actions, required for misuse flags).
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Enter reason for this action..."
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
            rows={3}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog({ open: false, type: '', title: '' })}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleAgentAction(actionDialog.type, actionReason)}
              disabled={actionDialog.type === 'mark_misuse' && !actionReason.trim()}
            >
              Confirm Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentConsole;