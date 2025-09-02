import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  const handleSubmit = () => {
    if (!formData.agreeTerms) {
      alert("Please agree to terms and conditions");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    alert("Sign up successful! Please verify your email.");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="absolute top-4 left-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex justify-center">
            <img 
              src={squirrelMascot} 
              alt="Lifelin3" 
              className="w-20 h-20 rounded-2xl shadow-premium"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Join Lifelin3</h1>
            <p className="text-muted-foreground">Create your secure wallet account</p>
          </div>
        </div>

        {/* Sign Up Form */}
        <Card className="p-8 bg-card border-0 shadow-premium">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="pl-10 h-12 bg-input border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="pl-10 h-12 bg-input border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="pl-10 h-12 bg-input border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="pl-10 pr-10 h-12 bg-input border-border text-foreground"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="pl-10 pr-10 h-12 bg-input border-border text-foreground"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 h-8 w-8 p-0"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({...formData, agreeTerms: !!checked})}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>
              </label>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold"
              disabled={!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword || !formData.agreeTerms}
            >
              Create Account
            </Button>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" className="text-primary p-0 h-auto" onClick={() => navigate(-1)}>
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
