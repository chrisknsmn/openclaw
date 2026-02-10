import projects from "@/data/projects.json";

interface Task {
  id: number;
  title: string;
  status: "completed" | "pending" | "in-progress";
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: "completed" | "pending" | "in-progress";
  completedAt: string | null;
  tasks: Task[];
}

const StatusBadge = ({
  status,
}: {
  status: "completed" | "pending" | "in-progress";
}) => {
  const colors = {
    completed: { bg: "#10b981", text: "#ecfdf5" },
    "in-progress": { bg: "#3b82f6", text: "#eff6ff" },
    pending: { bg: "#6b7280", text: "#f3f4f6" },
  };

  const labels = {
    completed: "✓ Completed",
    "in-progress": "⚡ In Progress",
    pending: "⏳ Pending",
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.375rem 0.75rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: "600",
        backgroundColor: colors[status].bg,
        color: colors[status].text,
      }}
    >
      {labels[status]}
    </span>
  );
};

export default function Dashboard() {
  const projectsData: Project[] = projects.projects;
  const completed = projectsData.filter((p) => p.status === "completed");
  const inProgress = projectsData.filter((p) => p.status === "in-progress");
  const pending = projectsData.filter((p) => p.status === "pending");

  const totalTasks = projectsData.reduce((sum, p) => sum + p.tasks.length, 0);
  const completedTasks = projectsData.reduce(
    (sum, p) =>
      sum + p.tasks.filter((t) => t.status === "completed").length,
    0
  );

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          🛠️ Jeeves Dashboard
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#a0a0a0" }}>
          All projects and tasks at a glance
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#808080" }}>
            Total Projects
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {projectsData.length}
          </div>
        </div>
        <div
          style={{
            padding: "1.5rem",
            background: "rgba(16, 185, 129, 0.1)",
            borderRadius: "0.5rem",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#10b981" }}>
            Completed
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}>
            {completed.length}
          </div>
        </div>
        <div
          style={{
            padding: "1.5rem",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "0.5rem",
            border: "1px solid rgba(59, 130, 246, 0.3)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#3b82f6" }}>
            In Progress
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6" }}>
            {inProgress.length}
          </div>
        </div>
        <div
          style={{
            padding: "1.5rem",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "#808080" }}>
            Tasks: {completedTasks}/{totalTasks}
          </div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {Math.round((completedTasks / totalTasks) * 100)}%
          </div>
        </div>
      </div>

      {/* Projects Sections */}
      {inProgress.length > 0 && (
        <Section
          title="⚡ In Progress"
          projects={inProgress}
          color="#3b82f6"
        />
      )}

      {completed.length > 0 && (
        <Section
          title="✓ Completed"
          projects={completed}
          color="#10b981"
        />
      )}

      {pending.length > 0 && (
        <Section
          title="⏳ Pending"
          projects={pending}
          color="#6b7280"
        />
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          textAlign: "center",
          color: "#606060",
          fontSize: "0.875rem",
        }}
      >
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </main>
  );
}

function Section({
  title,
  projects: projectList,
  color,
}: {
  title: string;
  projects: Project[];
  color: string;
}) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
          paddingBottom: "0.75rem",
          borderBottom: `2px solid ${color}`,
          color: color,
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
        }}
      >
        {projectList.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const completedTasks = project.tasks.filter(
    (t) => t.status === "completed"
  ).length;
  const progress = Math.round((completedTasks / project.tasks.length) * 100);

  return (
    <div
      style={{
        padding: "1.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "0.5rem",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>
            {project.name}
          </h3>
          <p style={{ color: "#a0a0a0", fontSize: "0.875rem" }}>
            {project.description}
          </p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            color: "#a0a0a0",
          }}
        >
          <span>Tasks</span>
          <span>
            {completedTasks}/{project.tasks.length}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "8px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                progress === 100
                  ? "#10b981"
                  : progress > 50
                    ? "#3b82f6"
                    : "#6b7280",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div
        style={{
          fontSize: "0.875rem",
          color: "#a0a0a0",
        }}
      >
        {project.tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 0",
              paddingLeft: "0.5rem",
              borderLeft:
                task.status === "completed"
                  ? "2px solid #10b981"
                  : "2px solid #606060",
              marginLeft: "-0.5rem",
            }}
          >
            <span
              style={{
                marginRight: "0.75rem",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {task.status === "completed" ? "✓" : task.status === "in-progress" ? "◐" : "◯"}
            </span>
            <span
              style={{
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
                color:
                  task.status === "completed" ? "#606060" : "#e0e0e0",
              }}
            >
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
