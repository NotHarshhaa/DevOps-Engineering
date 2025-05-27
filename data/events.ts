import { Events } from "@/types/events";

export const events: Events = [
  {
    year: 2025,
    periodType: "Q",
    periodNumber: 2,
    isChecked: true,
    events: [
      { title: "AWS Infrastructure Setup with Terraform (VPC, EC2, S3)", isChecked: true, type: "Infrastructure" },
      { title: "Docker Multi-Stage Build Optimization", isChecked: true, type: "Containers" },
      { title: "GitHub Actions CI Pipeline for Node.js Applications", isChecked: true, type: "CI/CD" },
      { title: "Bash Scripting for Automation (Backup, Deployment)", isChecked: true, type: "Automation" },
      { title: "AWS IAM Security Best Practices Implementation", isChecked: true, type: "Security" },
      { title: "Python Scripts for AWS Resource Management", isChecked: true, type: "Automation" },
      { title: "Docker Compose for Local Development", isChecked: true, type: "Development" }
    ],
  },
  {
    year: 2025,
    periodType: "Q",
    periodNumber: 3,
    isChecked: false,
    events: [
      { title: "Kubernetes Cluster Setup on AWS EKS", isChecked: false, type: "Orchestration" },
      { title: "Helm Charts for Application Deployment", isChecked: false, type: "Kubernetes" },
      { title: "Jenkins Declarative Pipeline with SonarQube", isChecked: false, type: "CI/CD" },
      { title: "Ansible Playbooks for Server Configuration", isChecked: false, type: "Configuration" },
      { title: "Prometheus & Grafana for Container Monitoring", isChecked: false, type: "Monitoring" },
      { title: "ELK Stack (Elasticsearch, Logstash, Kibana)", isChecked: false, type: "Logging" },
      { title: "HashiCorp Vault for Secrets Management", isChecked: false, type: "Security" },
      { title: "AWS Lambda Functions with Terraform", isChecked: false, type: "Serverless" }
    ],
  },
  {
    year: 2025,
    periodType: "Q",
    periodNumber: 4,
    isChecked: false,
    events: [
      { title: "GitOps with ArgoCD for K8s Deployments", isChecked: false, type: "GitOps" },
      { title: "Istio Service Mesh Implementation", isChecked: false, type: "Networking" },
      { title: "AWS EKS Security Hardening", isChecked: false, type: "Security" },
      { title: "Open Policy Agent (OPA) for K8s Policies", isChecked: false, type: "Security" },
      { title: "Azure AKS & GCP GKE Multi-Cloud Setup", isChecked: false, type: "Infrastructure" },
      { title: "Terraform Modules for Multi-Cloud", isChecked: false, type: "Infrastructure" },
      { title: "CI/CD Pipeline for Microservices", isChecked: false, type: "CI/CD" },
      { title: "Kong API Gateway Integration", isChecked: false, type: "Networking" }
    ],
  },
  {
    year: 2026,
    periodType: "Q",
    periodNumber: 1,
    isChecked: false,
    events: [
      { title: "AWS CDK for Infrastructure as Code", isChecked: false, type: "Infrastructure" },
      { title: "Datadog for Advanced Monitoring", isChecked: false, type: "Monitoring" },
      { title: "Chaos Mesh for Kubernetes Testing", isChecked: false, type: "Testing" },
      { title: "AWS CloudWatch Logs Insights", isChecked: false, type: "Logging" },
      { title: "Terraform Enterprise Workspace Setup", isChecked: false, type: "Infrastructure" },
      { title: "Jenkins X for Cloud-Native CI/CD", isChecked: false, type: "CI/CD" },
      { title: "AWS Cost Explorer & Budgeting", isChecked: false, type: "Operations" },
      { title: "Crossplane for K8s Resource Provisioning", isChecked: false, type: "Infrastructure" }
    ],
  },
  {
    year: 2026,
    periodType: "Q",
    periodNumber: 2,
    isChecked: false,
    events: [
      { title: "Flux CD for GitOps Automation", isChecked: false, type: "GitOps" },
      { title: "Custom Kubernetes Operators", isChecked: false, type: "Development" },
      { title: "Tekton Pipelines Implementation", isChecked: false, type: "CI/CD" },
      { title: "AWS App Mesh Service Mesh", isChecked: false, type: "Networking" },
      { title: "AWS ECS with Fargate", isChecked: false, type: "Containers" },
      { title: "Pulumi for Infrastructure as Code", isChecked: false, type: "Infrastructure" },
      { title: "AWS CloudFormation Templates", isChecked: false, type: "Infrastructure" },
      { title: "Terraform Import Automation", isChecked: false, type: "Automation" }
    ],
  },
  {
    year: 2026,
    periodType: "Q",
    periodNumber: 3,
    isChecked: false,
    events: [
      { title: "Advanced Kubernetes Operators Development", isChecked: false, type: "Development" },
      { title: "Service Mesh Federation (Istio & App Mesh)", isChecked: false, type: "Networking" },
      { title: "GitOps with Argo Rollouts", isChecked: false, type: "GitOps" },
      { title: "AWS Organizations & Control Tower", isChecked: false, type: "Infrastructure" },
      { title: "Custom Terraform Provider Development", isChecked: false, type: "Development" },
      { title: "Advanced Observability with OpenTelemetry", isChecked: false, type: "Monitoring" },
      { title: "Zero Trust Security Implementation", isChecked: false, type: "Security" },
      { title: "MLOps Pipeline with Kubeflow", isChecked: false, type: "MLOps" }
    ],
  }
]; 