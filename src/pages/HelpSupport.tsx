import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Bot, 
  User,
  Send,
  Clock,
  CheckCircle,
  HelpCircle,
  Search,
  ChevronRight
} from "lucide-react";

const HelpSupport = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [isAIChatActive, setIsAIChatActive] = useState(false);
  
  const chatMessages = [
    { type: 'ai', message: 'Hi! I\'m Ivy AI. How can I help you today?', time: '10:30 AM' },
    { type: 'user', message: 'I want to know about squirrel lending', time: '10:31 AM' },
    { type: 'ai', message: 'Squirrel lending allows you to borrow money for free for 45 days. You can borrow up to 80% of your  and squirrel balance. Would you like to know more about eligibility?', time: '10:31 AM' }
  ];

  const faqs = [
    {
      category: 'safeboxs',
      questions: [
        { q: 'How do I create a maternal safebox?', a: 'Go to safeboxs section and select Maternal safebox. You can start with as little as ₹10/day.' },
        { q: 'Can I add a partner to my maternal safebox?', a: 'Yes, you can add your partner as a joint account holder from the safebox settings.' },
        { q: 'What is pregnancy mode?', a: 'Pregnancy mode unlocks special features like ambulance benefits and increased auto-invest options.' }
      ]
    },
    {
      category: 'Squirrel Lending',
      questions: [
        { q: 'How do I earn squirrels?', a: 'Students earn 10 squirrels per ₹1,000 spent, professionals earn 100 squirrels per ₹1,000 spent.' },
        { q: 'How much can I borrow?', a: 'You can borrow up to 80% of your total squirrel balance for 45 days interest-free.' },
        { q: 'What happens after 45 days?', a: 'After 45 days, standard interest rates apply. You\'ll receive reminders before the due date.' }
      ]
    },
    {
      category: 'SOS & Safety',
      questions: [
        { q: 'How does Voice-Activated SOS work?', a: 'Say "Help Ivy SOS" to trigger emergency mode. It shares your location and vital signs automatically.' },
        { q: 'What is Walk With Me feature?', a: 'Real-time location sharing for safety. Limited to 2 sessions per day for fair use.' },
        { q: 'How do ambulance benefits work?', a: 'Pregnant users get 50/50 split (one-time), all users get 20% discount on standard rates.' }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Add message handling logic here
      setChatMessage("");
    }
  };

  const startAIChat = () => {
    setIsAIChatActive(true);
  };

  const startHumanChat = () => {
    // Logic to connect to human support
    alert("Connecting you to human support...");
  };

  const callSupport = () => {
    // Logic to initiate call
    alert("Initiating call to support...");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <HelpCircle className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Help & Support</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Get instant help or chat with our support team
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 md:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={callSupport}>
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-foreground">Call Support</h3>
              <p className="text-sm text-muted-foreground">Talk directly to our support team</p>
              <Badge variant="secondary">Instant</Badge>
            </div>
          </Card>

          <Card className="p-4 md:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={startAIChat}>
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-foreground">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">Get instant answers from Ivy AI</p>
              <Badge variant="secondary">24/7 Available</Badge>
            </div>
          </Card>

          <Card className="p-4 md:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={startHumanChat}>
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-foreground">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Chat with human support agent</p>
              <Badge variant="secondary">
                <Clock className="h-3 w-3 mr-1" />
                9 AM - 9 PM
              </Badge>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search for help..."
                    className="pl-10"
                  />
                </div>
              </div>

              {faqs.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="p-4 md:p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">{category.category}</h3>
                    <div className="space-y-3">
                      {category.questions.map((faq, index) => (
                        <div key={index} className="border border-border rounded-lg">
                          <details className="group">
                            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                              <span className="font-medium text-sm">{faq.q}</span>
                              <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                            </summary>
                            <div className="p-4 pt-0 text-sm text-muted-foreground">
                              {faq.a}
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="p-4 md:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Support Chat</h3>
                  <Badge variant={isAIChatActive ? "default" : "secondary"}>
                    {isAIChatActive ? "AI Assistant" : "Offline"}
                  </Badge>
                </div>

                {!isAIChatActive ? (
                  <div className="text-center space-y-4 py-8">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <MessageCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Choose Your Support Option</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Start with AI for instant help, or wait for human support
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button onClick={startAIChat}>
                          <Bot className="h-4 w-4 mr-2" />
                          Start AI Chat
                        </Button>
                        <Button variant="outline" onClick={startHumanChat}>
                          <User className="h-4 w-4 mr-2" />
                          Human Support
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="h-80 bg-muted/20 rounded-lg p-4 overflow-y-auto space-y-3">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.type === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-foreground'
                          }`}>
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Type your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline" size="sm" onClick={startHumanChat}>
                        Transfer to Human Agent
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 md:p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Support Helpline</p>
                        <p className="text-sm text-muted-foreground">1800-123-Ivy (7284)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Email Support</p>
                        <p className="text-sm text-muted-foreground">help@Lifelin3.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">Support Hours</p>
                        <p className="text-sm text-muted-foreground">9:00 AM - 9:00 PM (Mon-Sun)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Send us a Message</h3>
                  <div className="space-y-3">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Subject" />
                    <Textarea placeholder="Describe your issue..." className="min-h-[100px]" />
                    <Button className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We typically respond within 24 hours
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpSupport;
