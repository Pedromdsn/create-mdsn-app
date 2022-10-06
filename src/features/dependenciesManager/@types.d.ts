type SupportedPackageManagers = "npm" | "yarn" | "pnpm";

interface InstallConfig {
  prefer?: SupportedPackageManagers;
  cwd?: string;
}
