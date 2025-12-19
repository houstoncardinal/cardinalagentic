import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { agents } from "@/data/agentsData";
import {
  ArrowLeft,
  Plus,
  Play,
  Save,
  Trash2,
  Bot,
  ArrowRight,
  Workflow,
  Zap,
  Settings,
  GripVertical,
  X,
} from "lucide-react";

interface WorkflowStep {
  id: string;
  agentNumber: number;
  agentName: string;
  taskType: string;
  description: string;
  inputSource: "manual" | "previous";
}

const taskTypes: Record<number, string[]> = {
  1: ["Market Analysis", "Competitor Research", "Industry Trends", "Customer Insights"],
  2: ["Product Ideation", "Feature Prioritization", "Roadmap Planning", "Requirements Analysis"],
  3: ["Brand Strategy", "Campaign Planning", "Marketing Analysis", "Brand Positioning"],
  4: ["Content Creation", "Copy Editing", "SEO Content", "Social Media Posts"],
  5: ["Social Strategy", "Content Calendar", "Engagement Analysis", "Influencer Research"],
  6: ["Event Planning", "Speaking Topics", "Audience Research", "Presentation Outline"],
  7: ["Sprint Planning", "Delivery Tracking", "Quality Analysis", "Resource Planning"],
  8: ["Security Audit", "Compliance Check", "Policy Review", "Risk Assessment"],
  9: ["Call Handling", "Message Routing", "Appointment Scheduling", "Query Response"],
  10: ["Lead Scoring", "Customer Analysis", "Pipeline Review", "Relationship Mapping"],
  11: ["Financial Analysis", "Budget Review", "Revenue Forecasting", "Cost Optimization"],
  12: ["Recruitment Analysis", "Employee Engagement", "Performance Review", "Training Needs"],
  13: ["Training Program", "Skills Assessment", "Learning Path", "Content Development"],
  14: ["Project Planning", "Resource Allocation", "Timeline Management", "Risk Analysis"],
};

const WorkflowBuilder = () => {
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [selectedTaskType, setSelectedTaskType] = useState<string>("");
  const [stepDescription, setStepDescription] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const addStep = useCallback(() => {
    if (!selectedAgent || !selectedTaskType) {
      toast({
        title: "Missing information",
        description: "Please select an agent and task type",
        variant: "destructive",
      });
      return;
    }

    const agentNum = parseInt(selectedAgent);
    const agent = agents.find((a) => a.number === agentNum);

    if (!agent) return;

    const newStep: WorkflowStep = {
      id: crypto.randomUUID(),
      agentNumber: agentNum,
      agentName: agent.name,
      taskType: selectedTaskType,
      description: stepDescription,
      inputSource: steps.length === 0 ? "manual" : "previous",
    };

    setSteps((prev) => [...prev, newStep]);
    setSelectedAgent("");
    setSelectedTaskType("");
    setStepDescription("");
    setAddDialogOpen(false);

    toast({
      title: "Step added",
      description: `${agent.name} added to workflow`,
    });
  }, [selectedAgent, selectedTaskType, stepDescription, steps.length, toast]);

  const removeStep = (stepId: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== stepId));
  };

  const moveStep = (index: number, direction: "up" | "down") => {
    const newSteps = [...steps];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= steps.length) return;
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    setSteps(newSteps);
  };

  const saveWorkflow = () => {
    if (!workflowName.trim()) {
      toast({
        title: "Missing workflow name",
        description: "Please enter a name for your workflow",
        variant: "destructive",
      });
      return;
    }

    if (steps.length < 2) {
      toast({
        title: "Need more steps",
        description: "A workflow needs at least 2 agent steps",
        variant: "destructive",
      });
      return;
    }

    // Save workflow (in production, this would save to database)
    toast({
      title: "Workflow saved",
      description: `"${workflowName}" has been saved with ${steps.length} steps`,
    });
  };

  const runWorkflow = () => {
    if (steps.length < 2) {
      toast({
        title: "Cannot run workflow",
        description: "Add at least 2 steps to run the workflow",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Workflow started",
      description: `Running "${workflowName || "Untitled Workflow"}" with ${steps.length} agents`,
    });
  };

  const getAgentColor = (agentNumber: number) => {
    const colors: Record<number, string> = {
      1: "from-blue-500 to-cyan-500",
      2: "from-purple-500 to-pink-500",
      3: "from-orange-500 to-red-500",
      4: "from-green-500 to-emerald-500",
      5: "from-pink-500 to-rose-500",
      6: "from-yellow-500 to-amber-500",
      7: "from-indigo-500 to-blue-500",
      8: "from-red-500 to-orange-500",
      9: "from-teal-500 to-cyan-500",
      10: "from-violet-500 to-purple-500",
      11: "from-emerald-500 to-green-500",
      12: "from-sky-500 to-blue-500",
      13: "from-fuchsia-500 to-pink-500",
      14: "from-slate-500 to-gray-500",
    };
    return colors[agentNumber] || "from-gray-500 to-slate-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-accent/70 shadow-lg">
                  <Workflow className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Workflow Builder</h1>
                  <p className="text-muted-foreground">
                    Chain AI agents together for automated processes
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
                <div className="space-y-2">
                  <Label htmlFor="workflowName">Workflow Name</Label>
                  <Input
                    id="workflowName"
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    placeholder="e.g., Content Marketing Pipeline"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workflowDesc">Description (optional)</Label>
                  <Input
                    id="workflowDesc"
                    value={workflowDescription}
                    onChange={(e) => setWorkflowDescription(e.target.value)}
                    placeholder="What does this workflow do?"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={saveWorkflow} className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button onClick={runWorkflow} className="gap-2">
                <Play className="h-4 w-4" />
                Run Workflow
              </Button>
            </div>
          </div>

          {/* Workflow Canvas */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Steps List */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-card border-border min-h-[500px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Workflow Steps</h2>
                  <Badge variant="secondary">{steps.length} steps</Badge>
                </div>

                {steps.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Zap className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      No steps yet
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                      Start building your workflow by adding AI agents. Each step will pass its
                      output to the next agent in the chain.
                    </p>
                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <Plus className="h-4 w-4" />
                          Add First Step
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Workflow Step</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label>Select Agent</Label>
                            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose an AI agent" />
                              </SelectTrigger>
                              <SelectContent>
                                {agents.map((agent) => (
                                  <SelectItem key={agent.number} value={agent.number.toString()}>
                                    Agent {agent.number}: {agent.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {selectedAgent && (
                            <div className="space-y-2">
                              <Label>Task Type</Label>
                              <Select
                                value={selectedTaskType}
                                onValueChange={setSelectedTaskType}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select task type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {taskTypes[parseInt(selectedAgent)]?.map((task) => (
                                    <SelectItem key={task} value={task}>
                                      {task}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>Step Description (optional)</Label>
                            <Textarea
                              value={stepDescription}
                              onChange={(e) => setStepDescription(e.target.value)}
                              placeholder="Describe what this step should accomplish"
                              rows={3}
                            />
                          </div>

                          <Button onClick={addStep} className="w-full gap-2">
                            <Plus className="h-4 w-4" />
                            Add Step
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div key={step.id}>
                        <Card className="p-4 bg-muted/30 border-border hover:border-accent/30 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground font-bold text-sm">
                                {index + 1}
                              </div>
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            </div>

                            <div
                              className={`p-3 rounded-xl bg-gradient-to-br ${getAgentColor(
                                step.agentNumber
                              )} shadow-lg`}
                            >
                              <Bot className="h-6 w-6 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground truncate">
                                  {step.agentName}
                                </h3>
                                <Badge variant="outline" className="text-xs">
                                  Agent #{step.agentNumber}
                                </Badge>
                              </div>
                              <p className="text-sm text-accent font-medium">{step.taskType}</p>
                              {step.description && (
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {step.description}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="text-xs">
                                  Input: {step.inputSource === "manual" ? "Manual" : "From Step " + index}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => moveStep(index, "up")}
                                disabled={index === 0}
                              >
                                <ArrowRight className="h-4 w-4 -rotate-90" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => moveStep(index, "down")}
                                disabled={index === steps.length - 1}
                              >
                                <ArrowRight className="h-4 w-4 rotate-90" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => removeStep(step.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>

                        {index < steps.length - 1 && (
                          <div className="flex justify-center py-2">
                            <ArrowRight className="h-5 w-5 text-accent rotate-90" />
                          </div>
                        )}
                      </div>
                    ))}

                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full gap-2 border-dashed">
                          <Plus className="h-4 w-4" />
                          Add Another Step
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Workflow Step</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label>Select Agent</Label>
                            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose an AI agent" />
                              </SelectTrigger>
                              <SelectContent>
                                {agents.map((agent) => (
                                  <SelectItem key={agent.number} value={agent.number.toString()}>
                                    Agent {agent.number}: {agent.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {selectedAgent && (
                            <div className="space-y-2">
                              <Label>Task Type</Label>
                              <Select
                                value={selectedTaskType}
                                onValueChange={setSelectedTaskType}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select task type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {taskTypes[parseInt(selectedAgent)]?.map((task) => (
                                    <SelectItem key={task} value={task}>
                                      {task}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>Step Description (optional)</Label>
                            <Textarea
                              value={stepDescription}
                              onChange={(e) => setStepDescription(e.target.value)}
                              placeholder="Describe what this step should accomplish"
                              rows={3}
                            />
                          </div>

                          <Button onClick={addStep} className="w-full gap-2">
                            <Plus className="h-4 w-4" />
                            Add Step
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Available Agents */}
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-4">Available Agents</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {agents.slice(0, 8).map((agent) => (
                    <div
                      key={agent.number}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedAgent(agent.number.toString());
                        setAddDialogOpen(true);
                      }}
                    >
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${getAgentColor(
                          agent.number
                        )}`}
                      >
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {agent.name}
                        </p>
                        <p className="text-xs text-muted-foreground">#{agent.number}</p>
                      </div>
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Workflow Tips */}
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-4">Workflow Tips</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent mt-0.5" />
                    <span>Chain agents to pass output from one to the next automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="h-4 w-4 text-accent mt-0.5" />
                    <span>Configure each step with specific task types and parameters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Play className="h-4 w-4 text-accent mt-0.5" />
                    <span>Save and run workflows on-demand or schedule them</span>
                  </li>
                </ul>
              </Card>

              {/* Example Workflows */}
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold text-foreground mb-4">Example Workflows</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-auto py-3"
                    onClick={() => {
                      setWorkflowName("Content Marketing Pipeline");
                      setSteps([
                        {
                          id: "1",
                          agentNumber: 1,
                          agentName: "Market Research Agent",
                          taskType: "Market Analysis",
                          description: "Analyze target audience and trends",
                          inputSource: "manual",
                        },
                        {
                          id: "2",
                          agentNumber: 4,
                          agentName: "Content & Copywriting Agent",
                          taskType: "Content Creation",
                          description: "Create blog content based on research",
                          inputSource: "previous",
                        },
                        {
                          id: "3",
                          agentNumber: 5,
                          agentName: "Marketing & Social Media Agent",
                          taskType: "Social Strategy",
                          description: "Distribute content across channels",
                          inputSource: "previous",
                        },
                      ]);
                      toast({ title: "Template loaded", description: "Content Marketing Pipeline" });
                    }}
                  >
                    <Workflow className="h-4 w-4" />
                    <div className="text-left">
                      <p className="font-medium">Content Marketing</p>
                      <p className="text-xs text-muted-foreground">Research → Content → Social</p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-auto py-3"
                    onClick={() => {
                      setWorkflowName("Lead Qualification Pipeline");
                      setSteps([
                        {
                          id: "1",
                          agentNumber: 10,
                          agentName: "Client Relationship Management Agent",
                          taskType: "Lead Scoring",
                          description: "Score and qualify incoming leads",
                          inputSource: "manual",
                        },
                        {
                          id: "2",
                          agentNumber: 1,
                          agentName: "Market Research Agent",
                          taskType: "Customer Insights",
                          description: "Research qualified leads",
                          inputSource: "previous",
                        },
                      ]);
                      toast({ title: "Template loaded", description: "Lead Qualification Pipeline" });
                    }}
                  >
                    <Workflow className="h-4 w-4" />
                    <div className="text-left">
                      <p className="font-medium">Lead Qualification</p>
                      <p className="text-xs text-muted-foreground">CRM → Research</p>
                    </div>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorkflowBuilder;