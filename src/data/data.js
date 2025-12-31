// Import lucide-react icons at the top
import {
  Home,
  User,
  Briefcase,
  CheckSquare,
  Bookmark,
  FileText,
} from "lucide-react";

export const SeekerSidebar = [
  { name: "Home", path: "/seekerhome", icon: Home },
  { name: "My Profile", path: "/seekerprofile", icon: User },
  { name: "Browse Jobs", path: "/browsejobs", icon: Briefcase },
  { name: "Applied Jobs", path: "/appliedjobs", icon: CheckSquare },
  { name: "Saved Jobs", path: "/savedjobs", icon: Bookmark },
];

import { PlusSquare, Users } from "lucide-react";

export const RecruiterSidebar = [
  { name: "Home", path: "/recruiterhome", icon: Home },
  { name: "My Profile", path: "/recruiterprofile", icon: User },
  { name: "Post a Job", path: "/postjob", icon: PlusSquare },
  { name: "Jobs Posted", path: "/jobsposted", icon: Briefcase },
  { name: "Applicants", path: "/applicants", icon: Users },
];
