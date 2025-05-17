import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import TestPage from "@/pages/TestPage";
import AllAchievements from "@/pages/AllAchievements";
import { PlayerDataProvider } from "@/contexts/PlayerDataContext";

function Router() {
  return (
    <Switch>
      {/* Main dashboard page */}
      <Route path="/" component={Dashboard} />
      {/* All Achievements page */}
      <Route path="/achievements" component={AllAchievements} />
      {/* Test page to debug data issues */}
      <Route path="/test" component={TestPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayerDataProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </PlayerDataProvider>
    </QueryClientProvider>
  );
}

export default App;
