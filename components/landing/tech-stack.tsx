import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import { FaJenkins, FaDocker, FaGitAlt, FaGithub, FaAws, FaGitlab } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import {
  SiTerraform,
  SiKubernetes,
  SiAnsible,
  SiGrafana,
  SiPrometheus,
  SiSonarqube,
  SiElasticsearch,
  SiLinux,
  SiApacheairflow,
  SiAmazonecs,
  SiArgo
} from "react-icons/si";

const techStacks = {
  jenkins: {
    label: "Jenkins",
    icon: <FaJenkins className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  kubernetes: {
    label: "Kubernetes",
    icon: <SiKubernetes className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  docker: {
    label: "Docker",
    icon: <FaDocker className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  terraform: {
    label: "Terraform",
    icon: <SiTerraform className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  git: {
    label: "Git",
    icon: <FaGitAlt className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  github: {
    label: "GitHub",
    icon: <FaGithub className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  ansible: {
    label: "Ansible",
    icon: <SiAnsible className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  grafana: {
    label: "Grafana",
    icon: <SiGrafana className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  prometheus: {
    label: "Prometheus",
    icon: <SiPrometheus className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  aws: {
    label: "AWS",
    icon: <FaAws className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  azure: {
    label: "Azure",
    icon: <VscAzure className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  sonarqube: {
    label: "SonarQube",
    icon: <SiSonarqube className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  elasticsearch: {
    label: "Elasticsearch",
    icon: <SiElasticsearch className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  linux: {
    label: "Linux",
    icon: <SiLinux className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  airflow: {
    label: "Apache Airflow",
    icon: <SiApacheairflow className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  gitlab: {
    label: "GitLab",
    icon: <FaGitlab className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  ecs: {
    label: "ECS",
    icon: <SiAmazonecs className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
  argocd: {
    label: "ArgoCD",
    icon: <SiArgo className="size-6 sm:size-7 md:size-8 lg:size-10" />,
  },
};

export const TechStatck = () => {
  // Show only a subset of icons on very small screens
  const iconLimit = typeof window !== 'undefined' && window.innerWidth < 400 ? 10 : undefined;
  return (
    <TooltipProvider delayDuration={100}>
      <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-2 xs:gap-3 md:gap-4 rounded-full border p-2 sm:p-3 md:p-4">
        {Object.entries(techStacks).slice(0, iconLimit).map(([key, value]) => (
          <Tooltip key={key}>
            <TooltipTrigger
              asChild
              className="flex cursor-pointer items-center justify-center"
            >
              {value.icon}
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={5} className="text-xs sm:text-sm">
              <p>{value.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
