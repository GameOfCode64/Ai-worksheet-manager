import GoogleButton from "@/components/GoogleButton";
import LoginForm from "@/components/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2 text-balance">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-base">
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-xl border-border/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="sr-only">Login Form</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Form */}
            <LoginForm />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-card text-muted-foreground font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAuth Button */}
            <GoogleButton />

            {/* Footer Links */}
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="text-primary font-semibold hover:underline transition-colors"
                >
                  Sign up
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
