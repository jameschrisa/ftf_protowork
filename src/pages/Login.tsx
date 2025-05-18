import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { AlertMessage } from "../components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { motion } from "framer-motion";
import { AnimatedBackground } from "../components/ui/animated-background";
import { PasswordResetDialog } from "../components/ui/password-reset-dialog";
import logo from "../assets/ftf/logo.svg";

export default function Login() {
  const navigate = useNavigate();
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate inputs
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground 
        type="gradient" 
        backgroundImage="/newbg.jpg" 
        colorScheme="blue"
        dark={true}
        blur={true}
        opacity={0.6}
      >
        <div className="min-h-screen flex items-center justify-center">
          {/* Login Card */}
          <Card className="w-[400px] relative z-10 bg-background/95 backdrop-blur-sm">
          <CardHeader className="space-y-4 flex flex-col items-center">
            <img src={logo} alt="Logo" className="h-12 w-12" />
            <div className="flex flex-col items-center space-y-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <CardTitle className="text-3xl font-bold text-center">
                  ftf.ai
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-lg text-muted-foreground text-center">
                  AI Powered Financial Analyst
                </div>
              </motion.div>
            </div>
            <CardDescription>Please sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <AlertMessage variant="destructive" title="Authentication Error">
                  {error}
                </AlertMessage>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowResetDialog(true);
                    }}
                  >
                    Forgot Password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-muted-foreground">
              <p>By signing in, you agree to our terms of use and privacy policy.</p>
              <Button
                variant="link"
                className="h-auto p-0 text-primary"
                onClick={() => setShowTerms(true)}
              >
                View Terms of Use
              </Button>
            </div>
          </CardContent>
          </Card>
        </div>
      </AnimatedBackground>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms of Use</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 text-sm">
            <h3 className="font-semibold">1. Acceptance of Terms</h3>
            <p>
              By accessing and using the ftf.ai AI Powered Financial Analyst, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Use.
            </p>

            <h3 className="font-semibold">2. System Access and Security</h3>
            <p>
              Users are responsible for maintaining the confidentiality of their login credentials and must
              notify administrators immediately of any unauthorized access or security concerns.
            </p>

            <h3 className="font-semibold">3. Data Usage and Privacy</h3>
            <p>
              All data collected through the system is handled in accordance with our privacy policy and
              applicable data protection regulations. Users agree to use the system's data only for its
              intended purpose.
            </p>

            <h3 className="font-semibold">4. System Availability</h3>
            <p>
              While we strive to maintain system availability, we do not guarantee uninterrupted access.
              Maintenance windows and updates may occasionally affect system accessibility.
            </p>

            <h3 className="font-semibold">5. Compliance Requirements</h3>
            <p>
              Users must comply with all applicable laws, regulations, and industry standards when using
              the system. Any violation may result in immediate access termination.
            </p>

            <h3 className="font-semibold">6. Liability Limitations</h3>
            <p>
              ftf.ai is not liable for any damages arising from system use, data inaccuracies, or
              system unavailability. Users acknowledge that the system is a monitoring tool and does not
              replace human oversight.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowTerms(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Reset Dialog */}
      <PasswordResetDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onResetPassword={resetPassword}
      />
    </>
  );
}
