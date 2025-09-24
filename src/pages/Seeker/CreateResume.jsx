import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import SidebarSeeker from "../../components/SidebarSeeker";
import html2pdf from "html2pdf.js";

const CreateResume = () => {
  const location = useLocation();
  const profile = location.state?.profile;
  const resumeRef = useRef();

  if (!profile)
    return <p className="p-6 text-red-500">Profile data not found!</p>;

  const handleDownload = () => {
    html2pdf()
      .set({
        margin: 10,
        filename: `${profile.info.name}-Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(resumeRef.current)
      .save();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarSeeker />

      <div className="flex-1 p-5 bg-gray-100">
        {/* Header */}
        {/* Header */}
        <div className="border-b border-gray-300 px-8 py-3 shadow-sm bg-gray-50 mb-5 rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">Resume</h1>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            If you want to change the details shown in this resume, you can
            update them in your{" "}
            <span className="font-semibold text-blue-600">Profile</span>{" "}
            section.
          </p>
        </div>

        {/* Resume */}
        <div
          ref={resumeRef}
          className="bg-white shadow-lg rounded p-8 max-w-5xl mx-auto text-gray-800 font-sans"
        >
          {/* Profile Section */}
          <div className="text-center mb-6">
            {profile.profilePic ? (
              <img
                src={profile.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-gray-500">
                {profile.info.name?.charAt(0)}
              </div>
            )}
            <h2 className="text-2xl font-bold">{profile.info.name}</h2>
            <p className="mt-2 text-sm text-gray-600">
              A motivated professional seeking to contribute skills and grow in
              a dynamic environment.
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg border-b pb-1 mb-2">
              Contact
            </h3>
            <p>Email: {profile.info.email}</p>
            <p>Phone: {profile.info.phone}</p>
            <p>Location: {profile.info.location}</p>
          </div>

          {/* Experience Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg border-b pb-1 mb-2">
              Experience
            </h3>
            <div className="mb-4">
              <p className="font-semibold">
                Current Position (June 2022 – Present)
              </p>
              <ul className="list-disc list-inside ml-4 text-sm">
                <li>
                  Describe your current responsibilities and achievements.
                </li>
                <li>Use action verbs and quantify results where possible.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">
                Previous Position (May 2010 – February 2018)
              </p>
              <ul className="list-disc list-inside ml-4 text-sm">
                <li>Summarize past job duties and accomplishments.</li>
                <li>Highlight transferable skills and growth.</li>
              </ul>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg border-b pb-1 mb-2">
              Education
            </h3>
            <p className="text-sm">
              {profile.education?.degree || "Bachelor's Degree"} |{" "}
              {profile.education?.institution || "University Name"} |{" "}
              {profile.education?.cgpa
                ? `CGPA: ${profile.education.cgpa}`
                : "Graduation Year: YYYY"}
            </p>
            <ul className="list-disc list-inside ml-4 text-sm mt-2">
              <li>Include academic achievements or relevant coursework.</li>
              <li>Optional: Add extracurriculars or leadership roles.</li>
            </ul>
          </div>

          {/* Skills Section */}
          {profile.skills && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg border-b pb-1 mb-2">
                Skills
              </h3>
              <ul className="list-disc list-inside ml-4 text-sm">
                {profile.skills.split(",").map((skill, idx) => (
                  <li key={idx}>{skill.trim()}</li>
                ))}
                <li>Include both technical and interpersonal skills.</li>
                <li>Use keywords from the job posting.</li>
              </ul>
            </div>
          )}

          {/* Optional Sections */}
          {profile.projects && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg border-b pb-1 mb-2">
                Projects
              </h3>
              <p className="text-sm">{profile.projects}</p>
            </div>
          )}

          {profile.achievements && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg border-b pb-1 mb-2">
                Achievements / Certifications
              </h3>
              <p className="text-sm">{profile.achievements}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
